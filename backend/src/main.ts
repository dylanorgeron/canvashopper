import * as webSocket from 'ws'
import { IMessage } from '../../lib/interfaces/message';
import PlayerMetadata from './player-metadata';
import { v4 } from 'uuid';
import { Command } from '../../lib/enums/commands';
import { Level } from '../../lib/level/level';
import Player from './player';
import IKeystroke from '../../lib/interfaces/keystroke'
import { ISendLogin } from '../../lib/interfaces/commands/send-login';
import { IReceiveLogin } from '../../lib/interfaces/commands/receive-login';
import { IReceiveState } from '../../lib/interfaces/commands/receve-state';

const wss = new webSocket.Server({ port: 7071 });
const clients: Map<webSocket.WebSocket, PlayerMetadata> = new Map();

//init level
const level = new Level(500, 500)
level.addGeometryObject(-250, 100, 500, 100, "#ffcccc")
console.log(level)
//init players
const players: Player[] = []

//run at 32ms
let lastState = ''
const tickInterval = setInterval(() => {
  computeState(clients, level, players)
}, 32)

wss.on('connection', (ws) => {
  const playerId = v4()
  const metadata: PlayerMetadata = new PlayerMetadata(playerId)
  console.log("Connection made: " + metadata.playerId)
  clients.set(ws, metadata);

  ws.onclose = () => {
    console.log("connection closed: " + playerId)
    players.splice(players.findIndex(p => p.id == (clients.get(ws) as PlayerMetadata).playerId, 1))
    clients.delete(ws)
    ws.close()
  }

  ws.on('message', (data) => {
    const client = clients.get(ws);
    if (!client) {
      console.error(`Failed to find client from websocket: ${ws}`)
      return
    }
    const request: IMessage = JSON.parse(data.toString());
    request.params = JSON.parse(request.params)

    switch (request.command) {
      case Command.SendLogin:
        handleLogin(ws, request.params, client, players, playerId)
        break
      case Command.SendKeystroke:
        const keystrokeParams: IKeystroke = request.params
        const i = players.findIndex(p => p.id == playerId)
        if (!players[i]) {
          console.error('Unabled to find player with id: ', playerId)
          return
        }
        if (keystrokeParams.keyState) {
          if (keystrokeParams.keyCode == 37) {
            players[i].x -= 10
          } else if (keystrokeParams.keyCode == 39) {
            players[i].x += 10
          }
          else if (keystrokeParams.keyCode == 38) {
            players[i].y -= 10
          } else if (keystrokeParams.keyCode == 40) {
            players[i].y += 10
          }
        }
        break
    }
  });
});

function handleLogin(
  ws: webSocket.WebSocket,
  params: ISendLogin,
  client: PlayerMetadata,
  players: Player[],
  playerId: string
) {
  // set the username server-side
  client.username = params.Username
  players.push(new Player(playerId, client.username))
  //respond with initial state for client to draw first frame
  const response: IMessage = {
    command: Command.ReceiveLoginConfirmation,
    params: {
      playerId,
      initialState: { level, players }
    } as IReceiveLogin
  }
  ws.send(JSON.stringify(response))
  console.log(`Username for ${client.playerId} set to ${client.username}`)
}

function computeState(clients: Map<webSocket.WebSocket, PlayerMetadata>, level: Level, players: Player[]) {
  if (!clients.size) return
  //save current state
  const thisState = {
    level,
    players
  }
  clients.forEach((c: PlayerMetadata, ws: webSocket.WebSocket) => {
    //if nothing has changed since the last update, don't send an update this time
    if (JSON.stringify(thisState) == lastState) return
    console.log(clients.size)
    //build message
    const message: IMessage = {
      command: Command.ReceiveUpdate,
      params: {
        state: {
          level,
          players
        }
      } as IReceiveState
    }
    //send it
    if (ws) {
      ws.send(JSON.stringify(message))
    }
    //update last sent state with current state
  })
  lastState = JSON.stringify(thisState)
}
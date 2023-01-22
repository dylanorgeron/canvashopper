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
const clients = new Map();

//init level
const level = new Level(500, 500)
level.addGeometryObject(0, 0, 100, 100, "#ffcccc")
console.log(level)
//init players
const players: Player[] = []

//run at 32
let lastState = ''
const tick = setInterval(() => {
  if (!clients.size) return
  //save current state
  const thisState = {
    level,
    players
  }
  clients.forEach((c: PlayerMetadata, ws: WebSocket) => {
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
}, 32)

wss.on('connection', (ws) => {
  const playerId = v4()
  debugger
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
    const request: IMessage = JSON.parse(data.toString());
    request.params = JSON.parse(request.params)

    switch (request.command) {
      case Command.SendLogin:
        // set the username server-side and reply to client with their client data to affirm
        const params: ISendLogin = request.params
        client.username = params.Username
        players.push(new Player(playerId))
        const response: IMessage = {
          command: Command.ReceiveLoginConfirmation,
          params: {
            playerId,
            initialState: { level, players }
          } as IReceiveLogin
        }
        ws.send(JSON.stringify(response))
        console.log("username set to: " + client.username)
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
          } else if (keystrokeParams.keyCode == 39){
            players[i].x += 10
          }
          else if (keystrokeParams.keyCode == 38) {
            players[i].y -= 10
          } else if (keystrokeParams.keyCode == 40){
            players[i].y += 10
          }
        }
        break
    }

  });
});

wss.on("close", (ws: any) => {

});

console.log("wss up");
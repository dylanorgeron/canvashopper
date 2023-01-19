import * as webSocket from 'ws'
import { IMessage } from '../../lib/interfaces/message';
import PlayerMetadata from './player-metadata';
import { v4 } from 'uuid';
import { Commands } from '../../lib/enums/commands';
import { Level } from '../../lib/level/level';
import Player from './player';
import IKeystroke from '../../lib/interfaces/keystroke'

const wss = new webSocket.Server({ port: 7071 });
const clients = new Map();

//init level
const level = new Level(500, 500)
level.addGeometryObject(0, 600, 900, 200, "#d7d7d7")
level.addGeometryObject(200, 200, 200, 200, "#ffcccc")

//init players
const players: Player[] = []

//run at 32
let lastState = ''
const tick = setInterval(() => {
  if (!clients.size) return
  clients.forEach((c: PlayerMetadata, ws: WebSocket) => {
    //save current state
    const thisState = {
      level,
      players
    }
    //if nothing has changed since the last update, don't send an update this time
    if (JSON.stringify(thisState) == lastState) return

    //build message
    const message: IMessage = {
      command: Commands.Update,
      params: {
        level,
        players
      }
    }

    //send it
    if (ws) {
      console.log(`Updating ${c.id} with new state...`)
      ws.send(JSON.stringify(message))
    }
    console.log('Caching new state...')

    //update last sent state with current state
    lastState = JSON.stringify(thisState)
  })
}, 32)

wss.on('connection', (ws) => {
  const id = v4();
  const metadata: PlayerMetadata = new PlayerMetadata(id)

  console.log("Connection made: " + metadata.id)

  clients.set(ws, metadata);

  ws.on('message', (data) => {
    const client = clients.get(ws);
    const request: IMessage = JSON.parse(data.toString());
    request.params = JSON.parse(request.params)

    switch (request.command) {
      case Commands.RequestLogin:
        // set the username server-side and reply to client with their client data to affirm
        client.username = request.params.username
        players.push(new Player(id))
        const response: IMessage = {
          command: Commands.CompleteLogin,
          params: {
            id,
            level,
            players
          }
        }
        ws.send(JSON.stringify(response))
        console.log("username set to: " + client.username)
        break
      case Commands.Keystroke:
        const playerId = request.id
        const keystrokeParams: IKeystroke = request.params
        const i = players.findIndex(p => p.id == playerId)
        if (!players[i]) {
          console.error('Unabled to find player with id: ', playerId)
          return
        }
        if (keystrokeParams.keyState) {
          if (keystrokeParams.keyCode == 37) {
            players[i].x += 10
          } else {
            players[i].x -= 10
          }
        }
        console.log(players[i].x)
        break
    }

  });
});

wss.on("close", (ws: any) => {
  console.log("connection closed: " + ws.metadata.id)
  clients.delete(ws);
});

console.log("wss up");
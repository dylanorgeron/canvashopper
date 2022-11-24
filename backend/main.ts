import * as webSocket from 'ws'
import Message from '../lib/message';
import PlayerMetadata from './player-metadata';
import Level from '../lib/level'
import { v4 } from 'uuid';
import { Commands } from '../lib/commands';
import Tile from '../lib/map-generation/tile';

const wss = new webSocket.Server({ port: 7071 });
const clients = new Map();

//init level
const level = new Level(5)
console.log(JSON.stringify(level))

wss.on('connection', (ws) => {
    const id = v4();
    const metadata: PlayerMetadata = {
      Id: id, 
      Username : '' 
    };

    console.log("Connection made: " + metadata.Id)

    clients.set(ws, metadata);

    ws.on('message', (data) => {
      const request: Message = JSON.parse(data.toString());
      request.params = JSON.parse(request.params)
      
      console.log(request)
      const client = clients.get(ws);

      switch (request.command) {
        case 'login':
          // set the username server-side and reply to client with their client data to affirm
          client.username = request.params.username
          const response: Message = {
            command: Commands.CompleteLogin,
            params: {
              level: level.rooms.reduce((accum: Tile[], currentRoom) => 
                 [...accum, ...currentRoom.tiles]
              , [])
            }
          }
          ws.send(JSON.stringify(response))
          console.log("username set to: " + client.username)
      }

    });  
});

wss.on("close", (ws: any) => {
  console.log("connection closed: " + ws.metadata.id)
  clients.delete(ws);
});

console.log("wss up");
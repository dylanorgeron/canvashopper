import * as webSocket from 'ws'
import Message from '../lib/message';
import PlayerMetadata from './player-metadata';
import Level from '../lib/map-generation/level'

const wss = new webSocket.Server({ port: 7071 });
const clients = new Map();

//init level
const level = new Level()
console.log(JSON.stringify(level))

wss.on('connection', (ws) => {
    const id = uuidv4();
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
            command: 'userNameSuccess',
            params: {level: JSON.stringify(level)}
          }
          ws.send(JSON.stringify(response))
          console.log("username set to: " + client.username)
      }

    });  

    //join message
    clients.forEach((client, ws) => {
      const message = new Message()
      message.command = 'serverMessage'
      message.params = {text: "User Joined!"}
      ws.send(JSON.stringify(message));
    });
});

wss.on("close", (ws: any) => {
  console.log("connection closed: " + ws.metadata.id)
  clients.delete(ws);
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

console.log("wss up");
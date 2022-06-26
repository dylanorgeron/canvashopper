import * as webSocket from 'ws'
import Message from './message';

const wss = new webSocket.Server({ port: 7071 });
const clients = new Map();

wss.on('connection', (ws) => {
    const id = uuidv4();
    console.log("connection made: " + id)
    const color = Math.floor(Math.random() * 999999);
    const metadata = { id, color, username : '' };

    clients.set(ws, metadata);

    ws.on('message', (data) => {
      const request: Message = JSON.parse(data.toString());

      console.log(request)
      const client = clients.get(ws);
      console.log(client.username)

      switch (request.command) {
        case 'setUsername':
          // set the username server-side and reply to client with their client data to affirm
          client.username = request.params.username
          const responseParams = {
            id : client.id,
            color: client.color,
            username: client.username,
          }
          const response = new Message()
          response.command = 'setUsername'
          response.params = responseParams
          ws.send(JSON.stringify({response}))
          console.log("username set to: " + client.username)

        case 'chatMessage':
          // relay chat message to all connected clients
          request.params.username = client.username
          request.params.color = client.color
          clients.forEach((client, ws) => {
            ws.send(JSON.stringify(request));
          });
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
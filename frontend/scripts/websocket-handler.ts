import { EventEmitter } from "eventemitter3"
import { Command } from "../../lib/enums/commands"
import { IMessage } from "../../lib/interfaces/message"

const websocketAddress = 'ws://70.243.237.71:7071/ws'
// const websocketAddress = 'ws://localhost:7071/ws'

export class WebSocketHandler extends EventEmitter {

    public ws: WebSocket | null = null
    public connectionId: string
    constructor() {
        super()
    }

    public async init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            console.log('Initializing connection...')
            this.ws = await this.connectToServer()
            console.log('Initialization complete!')
            resolve()
        })
    }

    private async connectToServer(): Promise<WebSocket> {
        //attempt connection
        console.log(`Attempting to connect to websocket via ${websocketAddress}...`)
        const ws = new WebSocket(websocketAddress)
        //proxy ws messages as eventemitter events to allow us to catch them anywhere without having to add logic here
        ws.onmessage = (webSocketMessage) => {
            const message: IMessage = JSON.parse(webSocketMessage.data)
            this.emit(message.command, message.params)
        }
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (ws.readyState === 1) {
                    clearInterval(timer)
                    resolve(ws)
                    console.log("Connected to websocket!")
                }
            }, 10)
        })
    }

    //this is a wrapper for ws.send that appends the appropriate message data for the sending user, as well as structures it correctly
    public send(command: Command, params: any) {
        const message: IMessage = {
            command,
            params: JSON.stringify(params)
        }
        this.ws?.send(JSON.stringify(message))
    }
}

export class WebSocketFactory {
    public static async start(): Promise<WebSocketHandler> {
        return new Promise(async (resolve, reject) => {
            const webSocketHandler = new WebSocketHandler()
            await webSocketHandler.init()
            resolve(webSocketHandler)
        })
    }
}
import { Commands } from "../../lib/commands"
import Message from "../../lib/message"

const websocketAddress = 'ws://127.0.0.1:7071/ws'

export class WebSocketHandler {

    public ws: WebSocket | null = null
    constructor() {
    }

    public async init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            console.log('Initializing connection...')
            this.ws = await this.connectToServer()
            console.log('Initialization complete!')
            resolve()
        })
    }

    public login(username: string) {
        const message: Message = {
            id: '1',
            command: Commands.RequestLogin,
            params: JSON.stringify({ username })
        }
        this.ws?.send(JSON.stringify(message))
    }

    private async connectToServer(): Promise<WebSocket> {
        console.log(`Attempting to connect to websocket via ${websocketAddress}...`)
        const ws = new WebSocket(websocketAddress)
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
    public send(id: string, params: any) {
        const message: Message = {
            id,
            command: Commands.Keystroke,
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
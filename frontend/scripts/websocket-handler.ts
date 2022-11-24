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
            this.initHandlers(this.ws)
            console.log('Initialization complete!')
            resolve()
        })
    }

    public login(username: string) {
        const message: Message = {
            index: 1,
            command: 'login',
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

    private initHandlers(ws: WebSocket): void {
        ws.onmessage = (webSocketMessage) => {
            const message: Message = JSON.parse(webSocketMessage.data)
            const params = message.params as any
            switch (message.command) {
                default:
                    const app = document.getElementById('app')
                    if (app) {
                        app.innerHTML = `<pre><code style='color: #fff'>${JSON.stringify(message, null, '  ').trim()}</code></pre>`
                    }
                    break;
            }
        }
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
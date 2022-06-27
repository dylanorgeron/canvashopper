import Message from "../../lib/message"

const websocketAddress = 'ws://127.0.0.1:7071/ws'

export class WebSocketHandler{

    public ws: WebSocket | null = null
    private username: string = ''

    constructor () {
    }

    public async init(){
        console.log('Initializing connection...')
        this.ws = await this.connectToServer()
        this.initHandlers(this.ws)
        console.log('Initialization complete!')
    }

    public login(username: string){
        const message: Message =  {
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

    private initHandlers(ws: WebSocket): void{
        ws.onmessage = (webSocketMessage) => {
            console.log('message received')
            const message: Message = JSON.parse(webSocketMessage.data)

            switch (message.command) {
                case 'setUsername':
                    if(message.statusCode == 200){
                        console.log("Logged in!")
                    }else{
                        this.username = ''
                    }
                default:
                    console.log('unknown command')
                    break;
            }
        }
    }
}

export class WebSocketFactory{
    public static async start(){
        const webSocketHandler = new WebSocketHandler();
        webSocketHandler.init();
        return webSocketHandler;
    }
}
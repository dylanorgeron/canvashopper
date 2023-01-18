import Keystates from './keystates'
import { EventEmitter } from 'eventemitter3'
import Canvas from './canvas'
import DrawQueue from './draw-queue'
import { State } from '../../../lib/state'
import DrawableGeometryObject from './drawable-geometery-object'
import DrawablePlayer from './drawable-player'
import { WebSocketHandler } from '../websocket-handler'
import IKeystroke from '../../../lib/commands/keystroke'
import Message from '../../../lib/message'
import { Commands } from '../../../lib/commands'


export default class GameInstance {
    public id: string = ''
    public keystates = new Keystates()
    public emitter = new EventEmitter()
    public canvas: Canvas
    public clientPlayer: DrawablePlayer
    public drawQueue: DrawQueue
    public players: DrawablePlayer[] = []
    private app = document.getElementById('app') as HTMLElement
    constructor(
        public webSocketHandler: WebSocketHandler,
        initialState: State
    ) {
        //init handlers
        this.initWebsocketHandlers()

        //render canvas
        this.app.innerHTML = `
            <canvas id="main-canvas" width="900" height="800"></canvas>
        `
        this.initKeybindings()

        //drawing the game
        this.drawQueue = new DrawQueue(this)
        this.canvas = new Canvas()
        //generate drawable objects from state level data
        this.id = initialState.id
        console.log(`Starting game with id: ${this.id}`)
        initialState.level?.geometryObjects.forEach(go => {
            new DrawableGeometryObject(
                this,
                go.x,
                go.y,
                go.w,
                go.h
            )
        });
        //pull client player
        const initialClientPlayer = initialState.players.find(p => p.id == this.id)
        if (!initialClientPlayer) {
            console.error('Failed to initialize player')
            return
        }
        this.clientPlayer = new DrawablePlayer(
            this,
            initialState.id,
            initialClientPlayer.x,
            initialClientPlayer.y,
            40,
            100,
            true
        )
        this.players.push(this.clientPlayer)
        //load players to draw queue
        initialState.players.forEach(p => {
            if (p.id != this.id) {
                this.players.push(new DrawablePlayer(
                    this,
                    p.id,
                    p.x,
                    p.y,
                    40,
                    100
                ))
            }
        })

        this.initEmitters()
    }


    private initWebsocketHandlers() {
        if (!this.webSocketHandler.ws) return
        this.webSocketHandler.ws.onmessage = (webSocketMessage) => {
            const message: Message = JSON.parse(webSocketMessage.data)
            const params = message.params as any
            switch (message.command) {
                case Commands.Update:
                    if(!this.players) return
                    params.players.forEach(p => {
                        const i = this.players.findIndex(_p => _p.id == p.id)
                        this.players[i].x = p.x
                        this.players[i].y = p.y
                    })
                    break;
                case Commands.CompleteLogin:
                    //todo, move the logic from login.ts to this case
                    break;
                default:
                    console.log(message)
                    break;
            }
        }
    }

    private initKeybindings = () => {
        //register key listeners
        document.addEventListener("keydown", (evt) => {
            this.sendKeystroke(evt.keyCode, true)
        })
        document.addEventListener("keyup", (evt) => {
            this.sendKeystroke(evt.keyCode, false)
        })
    }

    private sendKeystroke(keyCode: number, keyState: boolean) {
        console.log('sending keystroke')
        const keystrokeParams: IKeystroke = {
            keyCode,
            keyState
        }
        this.webSocketHandler.send(this.id, keystrokeParams)
    }

    private initEmitters() {
        //first time render
        this.emitter.emit('draw')

        // draw, 32 for 30 fps, 16 for 60
        const framerate = 32
        setInterval(() => {
            this.canvas.canvasCTX.fillStyle = '#f7f7f7'
            this.canvas.canvasCTX.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.emitter.emit('draw')
        }, framerate)
    }
}
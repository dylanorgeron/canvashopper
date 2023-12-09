import Keystates from './keystates'
import { EventEmitter } from 'eventemitter3'
import Canvas from './render/canvas'
import DrawQueue from './render/draw-queue'
import DrawableGeometryObject from './render/drawable-geometery-object'
import DrawablePlayer from './render/drawable-player'
import { WebSocketHandler } from './websocket-handler'
import IKeystroke from '../../lib/interfaces/keystroke'
import { IMessage } from '../../lib/interfaces/message'
import { Command } from '../../lib/enums/commands'
import { IReceiveState } from '../../lib/interfaces/commands/receve-state'
import { IReceiveLogin } from '../../lib/interfaces/commands/receive-login'


export default class GameInstance {
    public playerId: string
    public keystates = new Keystates()
    public emitter = new EventEmitter()
    public canvas: Canvas
    public clientPlayer: DrawablePlayer
    public drawQueue: DrawQueue
    public players: DrawablePlayer[] = []
    private app = document.getElementById('app') as HTMLElement
    constructor(
        public webSocketHandler: WebSocketHandler,
        loginResponse: IReceiveLogin
    ) {
        this.playerId = loginResponse.playerId
        //render canvas
        this.app.innerHTML = `
            <div id="container">
                <canvas id="main-canvas" width="900" height="800"></canvas>
                <div id="chat">
                    <div id="players">
                    </div>
                    <div id="messages">
                    </div>
                </div>
            </div>
        `
        //drawing frames
        this.drawQueue = new DrawQueue(this)
        this.canvas = new Canvas()

        //init geometery
        loginResponse.initialState.level?.geometryObjects.forEach(geoObj => {
            new DrawableGeometryObject(
                this,
                geoObj.id,
                geoObj.x,
                geoObj.y,
                geoObj.w,
                geoObj.h
            )
        });
        //pull client player from res and init
        const initialClientPlayer = loginResponse.initialState.players.find(p => p.id == this.playerId)
        if (!initialClientPlayer) {
            console.error('Failed to initialize player')
            return
        }
        this.clientPlayer = new DrawablePlayer(
            this,
            loginResponse.playerId,
            initialClientPlayer.username,
            initialClientPlayer.x,
            initialClientPlayer.y,
            40,
            100,
            true
        )
        this.players.push(this.clientPlayer)
        //load players to draw queue
        loginResponse.initialState.players.forEach(p => {
            if (p.id != this.playerId) {
                this.players.push(new DrawablePlayer(
                    this,
                    p.id,
                    p.username,
                    p.x,
                    p.y,
                    40,
                    100
                ))
            }
        })

        //init keybinds
        this.initKeybindings()
        //init handlers for messages FROM server
        this.initWebsocketHandlers()
        //init handlers for sending messages TO the server
        this.initEmitters()
    }


    private initWebsocketHandlers() {
        if (!this.webSocketHandler.ws) return
        this.webSocketHandler.ws.onmessage = (webSocketMessage) => {
            const message: IMessage = JSON.parse(webSocketMessage.data)
            switch (message.command) {
                case Command.ReceiveUpdate:
                    const receiveStateParams: IReceiveState = message.params
                    console.log(receiveStateParams.state.players.map(p => { return JSON.stringify({id: p.id, x: p.x, y: p.y})}).join(', '))
                    if (!this.players) return
                    //generate drawable objects from state level data
                    receiveStateParams.state.level?.geometryObjects.forEach(geoObj => {
                        const i = this.drawQueue.drawables.findIndex(d => d.id == geoObj.id)
                        if (i == -1) {
                            new DrawableGeometryObject(
                                this,
                                geoObj.id,
                                geoObj.x,
                                geoObj.y,
                                geoObj.w,
                                geoObj.h
                            )
                        } else {
                            this.drawQueue.drawables[i].x = geoObj.x
                            this.drawQueue.drawables[i].y = geoObj.y
                            this.drawQueue.drawables[i].h = geoObj.h
                            this.drawQueue.drawables[i].w = geoObj.w
                        }
                    });

                    receiveStateParams.state.players.forEach(p => {
                        const i = this.players.findIndex(_p => _p.id == p.id)
                        if (i == -1) {
                            this.players.push(new DrawablePlayer(
                                this,
                                p.id,
                                p.username,
                                p.x,
                                p.y,
                                40,
                                100
                            ))
                        }
                        else {
                            this.players[i].x = p.x
                            this.players[i].y = p.y
                        }
                    })
                    this.players.filter(
                        p => receiveStateParams.state.players.findIndex(_p => _p.id == p.id) === -1
                    ).forEach((p, i) => {
                        this.players.splice(i,1)
                        this.drawQueue.drawables.splice(this.drawQueue.drawables.findIndex(d => d.id == p.id),1)
                    })
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
        const keystrokeParams: IKeystroke = {
            keyCode,
            keyState
        }
        this.webSocketHandler.send(Command.SendKeystroke, keystrokeParams)
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
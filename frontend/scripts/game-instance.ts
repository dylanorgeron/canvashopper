import Keystates from '../../lib/engine/keystates'
import { EventEmitter } from 'eventemitter3'
import Canvas from '../../lib/engine/canvas'
import Level from '../../lib/map-generation/level'
import { WebSocketHandler } from './websocket-handler'
import Camera from '../../lib/engine/camera'
import Player from '../../lib/engine/player'
import DrawQueue from '../../lib/engine/draw-queue'

export default class GameInstance {
    private keystates = new Keystates()
    public emitter = new EventEmitter()
    public camera: Camera
    public canvas: Canvas
    public level: Level
    public clientPlayer: Player
    public drawQueue: DrawQueue
    private app = document.getElementById('app') as HTMLElement
    constructor(public ws: WebSocketHandler){
        ws.gameInstance = this
    }
    public start(levelData: string) {
        console.log("Starting game...")
        this.app.innerHTML = `
            <canvas id="main-canvas" width="900" height="800"></canvas>
        `
        this.initKeybindings()
        
        this.drawQueue = new DrawQueue(this.emitter)
        this.canvas = new Canvas()
        this.camera = new Camera(this.emitter)
        this.initLevel(levelData)
        this.clientPlayer = new Player(
            0,0,
            this.camera,
            this.canvas,
            this.keystates,
            this.level,
            this.drawQueue,
            this.emitter
        )
    }
    private initKeybindings = () => {
        //register key listeners
        document.addEventListener("keydown", (evt) => {
            this.keystates.setKey(evt.keyCode, true)
        })
        document.addEventListener("keyup", (evt) => {
            this.keystates.setKey(evt.keyCode, false)
        })

        //first time update and render
        this.emitter.emit('updatePhysics')
        this.emitter.emit('renderObjects')

        // calc physics, 32 for 30 fps, 16 for 60
        const framerate = 32
        setInterval(() => {
            this.emitter.emit('updatePhysics')
        }, framerate)
        setInterval(() => {
            this.canvas.canvasCTX.fillStyle = '#2c2c5e'
            this.canvas.canvasCTX.fillRect(0,0, this.canvas.width, this.canvas.height)
            this.emitter.emit('renderObjects')
        }, framerate)
    }

    private initLevel = (levelDataStr: string) => {
        const levelData = JSON.parse(levelDataStr)
        console.log(levelData)
        this.level = new Level()
    }
}
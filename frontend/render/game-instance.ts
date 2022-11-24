import Keystates from './keystates'
import { EventEmitter } from 'eventemitter3'
import Canvas from './canvas'
import Level from '../../lib/level'
import Camera from './camera'
import Player from './player'
import DrawQueue from './draw-queue'
import { State } from '../../lib/state'


export default class GameInstance {
    public keystates = new Keystates()
    public emitter = new EventEmitter()
    public camera: Camera
    public canvas: Canvas
    public level: Level
    public clientPlayer: Player
    public drawQueue: DrawQueue
    private app = document.getElementById('app') as HTMLElement
    constructor(initialState: State) {
        console.log("Starting game...")
        this.app.innerHTML = `
            <canvas id="main-canvas" width="900" height="800"></canvas>
        `
        this.initKeybindings()
        this.drawQueue = new DrawQueue(this)
        this.canvas = new Canvas()
        this.camera = new Camera(this)
        // this.level = initialState.level
        // this.clientPlayer = new Player(this)
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
            this.canvas.canvasCTX.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.emitter.emit('renderObjects')
        }, framerate)
    }
}
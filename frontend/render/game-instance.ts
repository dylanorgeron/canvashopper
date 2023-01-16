import Keystates from './keystates'
import { EventEmitter } from 'eventemitter3'
import Canvas from './canvas'
import Player from './player'
import DrawQueue from './draw-queue'
import { State } from '../../lib/state'
import DrawableGeometryObject from './drawable-geometery-object'


export default class GameInstance {
    public keystates = new Keystates()
    public emitter = new EventEmitter()
    public canvas: Canvas
    public clientPlayer: Player
    public drawQueue: DrawQueue
    private app = document.getElementById('app') as HTMLElement
    constructor(initialState: State) {
        console.log("Starting game...")
        //render canvas
        this.app.innerHTML = `
            <canvas id="main-canvas" width="900" height="800"></canvas>
        `
        // this.initKeybindings()

        //drawing the game
        this.drawQueue = new DrawQueue(this)
        this.canvas = new Canvas()
        //generate drawable objects from state level data
        initialState.level?.geometryObjects.forEach(go => {
            new DrawableGeometryObject(
                this,
                this.emitter,
                go.x,
                go.y,
                go.w,
                go.h,
                true
            )
        });
        this.clientPlayer = new Player(this)
        this.initEmitters()
    }
    private initKeybindings = () => {
        //register key listeners
        document.addEventListener("keydown", (evt) => {
            this.keystates.setKey(evt.keyCode, true)
        })
        document.addEventListener("keyup", (evt) => {
            this.keystates.setKey(evt.keyCode, false)
        })
    }

    private initEmitters() {
        //first time render
        this.emitter.emit('draw')

        // calc physics, 32 for 30 fps, 16 for 60
        const framerate = 32
        setInterval(() => {
        }, framerate)
        setInterval(() => {
            this.canvas.canvasCTX.fillStyle = '#f7f7f7'
            this.canvas.canvasCTX.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.emitter.emit('draw')
        }, framerate)
    }
}
import Keystates from './engine/keystates'
import { EventEmitter } from 'eventemitter3'
import Canvas from './engine/canvas'

export default class GameInstance {
    private keystates = new Keystates()
    public emitter = new EventEmitter()
    public canvas: Canvas
    private app = document.getElementById('app') as HTMLElement
    public start() {
        console.log("Starting game...")
        this.app.innerHTML = `
            <canvas id="main-canvas" width="900" height="800"></canvas>
        `
        this.initKeybindings()
        this.canvas = new Canvas()
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
}
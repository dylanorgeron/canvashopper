import EventEmitter from "eventemitter3"
import DrawQueue from "./draw-queue"

export default class Drawable{
    public zIndex = 0
    constructor(public drawQueue: DrawQueue, public emitter: EventEmitter){
        drawQueue.drawables.push(this)
        emitter.on('updatePhysics', this.update.bind(this))
    }
    public draw(){}
    public update(){}
}
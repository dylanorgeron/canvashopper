import { emitter } from ".."
import { drawQueue } from '../index'
export default class Drawable{
    public zIndex = 0
    constructor(){
        drawQueue.drawables.push(this)
        emitter.on('updatePhysics', this.update.bind(this))
    }
    public draw(){}
    public update(){}
}
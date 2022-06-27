import EventEmitter from "eventemitter3"
import Drawable from "./drawable"
export default class DrawQueue{
    public drawables: Drawable[] = []
    constructor(public emitter: EventEmitter){
		emitter.on('renderObjects', this.processQueue.bind(this))
    }

    public processQueue(){
        this.drawables.sort((a, b) => a.zIndex - b.zIndex).forEach((d) => {
            d.draw()
        })
    }
}
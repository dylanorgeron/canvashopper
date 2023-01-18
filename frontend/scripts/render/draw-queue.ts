import GameInstance from "./game-instance"
import Drawable from "./drawable"
export default class DrawQueue{
    public drawables: Drawable[] = []
    constructor(public gameInstance: GameInstance){
		this.gameInstance.emitter.on('draw', this.processQueue.bind(this))
    }

    public processQueue(){
        this.drawables.sort((a, b) => a.zIndex - b.zIndex).forEach((d) => {
            d.draw()
        })
    }
}
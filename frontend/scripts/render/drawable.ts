import GameInstance from "./game-instance"

export default class Drawable{
    public zIndex = 0
    constructor(public gameInstance: GameInstance){
        this.gameInstance.drawQueue.drawables.push(this)
        this.gameInstance.emitter.on('draw', this.draw.bind(this))
    }
    public draw(){}
}
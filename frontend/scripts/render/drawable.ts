import GameInstance from "../game-instance"

export default class Drawable {
    public zIndex = 0

    constructor(
        public gameInstance: GameInstance,
        public id: string,
        public x = 0,
        public y = 0,
        public w = 0,
        public h = 0
    ) {
        this.gameInstance.drawQueue.drawables.push(this)
        this.gameInstance.emitter.on('draw', this.draw.bind(this))
    }
    public draw() { }
}
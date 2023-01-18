import Drawable from './drawable'
import GameInstance from './game-instance'

class DrawablePlayer extends Drawable {
    public fillColor = "#ffaaaa"
    public img = ""
    constructor(
        public gameInstance: GameInstance,
        public id: string,
        public x: number,
        public y: number,
        //width and height
        public w: number,
        public h: number,
        public isClient: boolean = false
    ) {
        super(gameInstance)
    }
    draw() {
        const isOnScreen = true
        if (isOnScreen) {
            //draw object in relation to player
            //player is always in the center of the screen
            this.gameInstance.canvas.canvasCTX.fillStyle = this.fillColor
            if (this.isClient) {
                this.gameInstance.canvas.canvasCTX.fillRect(
                    (this.gameInstance.canvas.width / 2) - this.w / 2,
                    (this.gameInstance.canvas.height / 2),
                    this.w,
                    this.h
                    )
            } else {
                this.gameInstance.canvas.canvasCTX.fillRect(
                    this.x + this.gameInstance.clientPlayer.x + (this.gameInstance.canvas.width / 2),
                    this.y + this.gameInstance.clientPlayer.y + (this.gameInstance.canvas.height / 2),
                    this.w,
                    this.h
                )
            }
        }
    }
}

export default DrawablePlayer
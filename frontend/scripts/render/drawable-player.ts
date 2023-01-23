import GameInstance from '../game-instance'
import Drawable from './drawable'

class DrawablePlayer extends Drawable {
    public fillColor = "#ffaaaa"
    public img = ""
    public deleted = false

    constructor(
        public gameInstance: GameInstance,
        public id: string,
        public username: string,
        public x: number,
        public y: number,
        //width and height
        public w: number,
        public h: number,
        public isClient: boolean = false
    ) {
        super(gameInstance, id, username, x, y, w, h)
    }
    draw() {
        const isOnScreen = true
        if (isOnScreen && !this.deleted) {
            //draw object in relation to player
            //player is always in the center of the screen
            this.gameInstance.canvas.canvasCTX.fillStyle = this.fillColor
            this.gameInstance.canvas.canvasCTX.font = "18px monospace"
            this.gameInstance.canvas.canvasCTX.textAlign = 'center'
            if (this.isClient) {
                this.gameInstance.canvas.canvasCTX.fillText(
                    this.username,
                    this.gameInstance.canvas.width/2,
                    this.gameInstance.canvas.height/2 - 10
                )
                this.gameInstance.canvas.canvasCTX.fillRect(
                    (this.gameInstance.canvas.width / 2) - this.w / 2,
                    (this.gameInstance.canvas.height / 2),
                    this.w,
                    this.h
                    )
            } else {
                this.gameInstance.canvas.canvasCTX.fillStyle = "#ccccff"
                this.gameInstance.canvas.canvasCTX.fillText(
                    this.username,
                    this.x - this.gameInstance.clientPlayer.x + (this.gameInstance.canvas.width / 2),
                    this.y - this.gameInstance.clientPlayer.y + (this.gameInstance.canvas.height / 2) - 10,
                )
                this.gameInstance.canvas.canvasCTX.fillRect(
                    this.x - this.gameInstance.clientPlayer.x + (this.gameInstance.canvas.width / 2) - (this.gameInstance.clientPlayer.w / 2),
                    this.y - this.gameInstance.clientPlayer.y + (this.gameInstance.canvas.height / 2),
                    this.w,
                    this.h
                )
            }
        }
    }
}

export default DrawablePlayer
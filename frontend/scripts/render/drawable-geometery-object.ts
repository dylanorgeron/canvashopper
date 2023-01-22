import GameInstance from '../game-instance'
import Drawable from './drawable'

class DrawableGeometryObject extends Drawable {


    public fillColor = "#cccccc"
    public img = ""
    constructor(
        public gameInstance: GameInstance,
        id, x,y,w,h
    ) {
        super(gameInstance, id, x, y, w, h)
    }
    draw() {
        const isOnScreen = true
        if (isOnScreen) {
            //draw object in relation to player
            //player is always in the center of the screen
            this.gameInstance.canvas.canvasCTX.fillStyle = this.fillColor
            this.gameInstance.canvas.canvasCTX.fillRect(
                this.x - this.gameInstance.clientPlayer.x + (this.gameInstance.canvas.width / 2) - (this.gameInstance.clientPlayer.w / 2),
                this.y - this.gameInstance.clientPlayer.y + (this.gameInstance.canvas.height / 2),
                this.w,
                this.h
            )
        }
    }
}

export default DrawableGeometryObject
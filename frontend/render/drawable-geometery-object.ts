import EventEmitter from 'eventemitter3'
import Drawable from './drawable'
import GameInstance from './game-instance'

class DrawableGeometryObject extends Drawable {


    public fillColor = ""
    public img = ""
    constructor(
        public gameInstance: GameInstance,
        public emitter: EventEmitter,
        //position on map in pixels
        public x: number,
        public y: number,
        //width and height
        public w: number,
        public h: number,
        public isSolid: boolean,
    ) {
        super(gameInstance)
    }
    draw() {
        const isOnScreen = true
        if (isOnScreen) {
            //draw object in relation to player
            //player is always in the center of the screen
            this.gameInstance.canvas.canvasCTX.fillStyle = this.fillColor ? this.fillColor : this.isSolid ? '#AAA' : '#FFF'
            this.gameInstance.canvas.canvasCTX.fillRect(
                this.x + this.gameInstance.clientPlayer.x + (this.gameInstance.canvas.width / 2),
                this.y + this.gameInstance.clientPlayer.y + (this.gameInstance.canvas.height / 2),
                this.w,
                this.h
            )
        }
    }
}

export default DrawableGeometryObject
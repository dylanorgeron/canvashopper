import EventEmitter from 'eventemitter3'
import Coordinate from '../../lib/map-generation/coordinate'
import Settings from '../../lib/settings'
import Drawable from './drawable'
import GameInstance from './game-instance'
const settings = new Settings()

class DrawableTile extends Drawable{
	public w = settings.tileSize
	public h = settings.tileSize

	//position on map in pixels
	public x: number
	public y: number

	public fillColor = ""
	public img = ""
	constructor(
		public gameInstance: GameInstance,
        public emitter: EventEmitter,
		public col: number,
		public row: number,
		public isSolid: boolean,
	) {
        super(gameInstance)
		this.x = this.col * this.w
		this.y = this.row * this.h
	}
	update() {
	}

	draw() {
		this.h = settings.tileSize
		this.w = settings.tileSize
		//determine where to draw the tile
		let thickness = 1
		let origin = new Coordinate(
			this.x - this.gameInstance.camera.originX - (thickness),
			this.y - this.gameInstance.camera.originY - (thickness))
		const onScreen = 
			origin.x + settings.tileSize < 0 &&
			origin.x < this.gameInstance.canvas.width &&
			origin.y + settings.tileSize < 0 &&
			origin.y < this.gameInstance.canvas.height
		if (!onScreen) {
			if (settings.drawTextures) {
				let img = document.getElementById(this.img ? this.img : 'floor')
				let origin = new Coordinate(this.x - this.gameInstance.camera.originX, this.y - this.gameInstance.camera.originY)
				this.gameInstance.canvas.canvasCTX.drawImage(img as CanvasImageSource, origin.x, origin.y, this.w, this.h)
			} else {
				//draw grid
				this.gameInstance.canvas.canvasCTX.fillStyle = '#DDD'
				this.gameInstance.canvas.canvasCTX.fillRect(
					origin.x,
					origin.y,
					this.w + (thickness * 2),
					this.h + (thickness * 2)
				)
				//draw square
				this.gameInstance.canvas.canvasCTX.fillStyle = this.fillColor ? this.fillColor : this.isSolid ? '#AAA' : '#FFF'
				this.gameInstance.canvas.canvasCTX.fillRect(
					this.x - this.gameInstance.camera.originX,
					this.y - this.gameInstance.camera.originY,
					this.w,
					this.h
				)
			}
		}
	}
}

export default DrawableTile
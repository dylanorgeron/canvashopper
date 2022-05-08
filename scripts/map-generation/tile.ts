import Drawable from '../engine/drawable'
import { canvas, settings, camera } from '../index'
import Coordinate from './coordinate'

class Tile extends Drawable{
	public w = settings.tileSize
	public h = settings.tileSize

	//position on map in pixels
	public x: number
	public y: number

	public fillColor = ""
	public img = ""
	constructor(
		public col: number,
		public row: number,
		public isSolid: boolean,
	) {
		super()
		this.zIndex = 1
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
			this.x - camera.originX - (thickness),
			this.y - camera.originY - (thickness))
		const onScreen = 
			origin.x + settings.tileSize < 0 &&
			origin.x < canvas.width &&
			origin.y + settings.tileSize < 0 &&
			origin.y < canvas.height
		if (!onScreen) {
			if (settings.drawTextures) {
				let img = document.getElementById(this.img ? this.img : 'floor')
				let origin = new Coordinate(this.x - camera.originX, this.y - camera.originY)
				canvas.canvasCTX.drawImage(img, origin.x, origin.y, this.w, this.h)
			} else {
				//draw grid
				canvas.canvasCTX.fillStyle = '#DDD'
				canvas.canvasCTX.fillRect(
					origin.x,
					origin.y,
					this.w + (thickness * 2),
					this.h + (thickness * 2)
				)
				//draw square
				canvas.canvasCTX.fillStyle = this.fillColor ? this.fillColor : this.isSolid ? '#AAA' : '#FFF'
				canvas.canvasCTX.fillRect(
					this.x - camera.originX,
					this.y - camera.originY,
					this.w,
					this.h
				)
			}
		}
	}
}

export default Tile
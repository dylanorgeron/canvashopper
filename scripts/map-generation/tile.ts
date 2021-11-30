import {emitter, canvas, level, settings} from '../index' 

class Tile {
	public w = settings.tileSize
	public h = settings.tileSize
  
	public x: number
	public y: number
  
	public fillColor = ""
	constructor(
		public col: number,
		public row: number,
		public isSolid: boolean
	) {  
		emitter.on('updatePhysics', this.update.bind(this))
		emitter.on('renderObjects', this.draw.bind(this))
		this.x = this.col * this.w
		this.y = this.row * this.h
	}

	update(){
	}

	draw(){
		this.h = settings.tileSize
		this.w = settings.tileSize
		//determine where to draw the tile
		const fallsShort = ((this.col + 1) * this.w) - level.offsetX < 0
		if(!fallsShort){
			var thickness = 1
			canvas.canvasCTX.fillStyle = '#DDD'
			canvas.canvasCTX.fillRect(this.x - level.offsetX - (thickness), this.y - level.offsetY - (thickness), this.w + (thickness * 2), this.h + (thickness * 2))
			canvas.canvasCTX.fillStyle = this.fillColor ? this.fillColor : this.isSolid ? '#aaa' : '#FFF'
			canvas.canvasCTX.fillRect(this.x - level.offsetX, this.y - level.offsetY, this.w, this.h)
		}
	}
}

export default Tile
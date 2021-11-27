import {emitter, canvas, level, settings} from './index' 

class Tile {
	public readonly w = settings.tileSize
	public readonly h = settings.tileSize
  
	public x = this.col * this.w
	public y = this.row * this.h
  
	constructor(
		public col: number,
		public row: number,
		public isSolid: boolean
	) {  
		emitter.on('updatePhysics', this.update.bind(this))
		emitter.on('renderObjects', this.draw.bind(this))
	}

	update(){
	}

	draw(){
		//determine where to draw the tile
		const fallsShort = ((this.col + 1) * this.w) - level.offsetX < 0
		if(!fallsShort){
			var thickness = 1
			canvas.canvasCTX.fillStyle = '#DDD'
			canvas.canvasCTX.fillRect(this.x - level.offsetX - (thickness), this.y - (thickness), this.w + (thickness * 2), this.h + (thickness * 2))
			canvas.canvasCTX.fillStyle = this.isSolid ? '#aaa' : '#FFF'
			canvas.canvasCTX.fillRect(this.x - level.offsetX, this.y, this.w, this.h)
		}
	}
}

export default Tile
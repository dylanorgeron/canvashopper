import {emitter, canvas, level} from './index' 

class Tile {
	public readonly w = 50
	public readonly h = 50
  
	public x = this.col * this.w
	public y = this.row * this.h
  
	constructor(
		public col: number,
		public row: number,
		public isSolid: boolean
	) {  
		emitter.on('update', this.update.bind(this))
	}

	update(){
		this.draw()
	}

	draw(){
		//determine where to draw the tile
		const fallsShort = ((this.col + 1) * this.w) - level.offsetX < 0
		if(!fallsShort){
			var thickness = 1
			canvas.canvasCTX.fillStyle = '#DDD'
			canvas.canvasCTX.fillRect(this.x - (thickness), this.y - (thickness), this.w + (thickness * 2), this.h + (thickness * 2))
			canvas.canvasCTX.fillStyle = this.isSolid ? '#aaa' : '#FFF'
			canvas.canvasCTX.fillRect(this.x, this.y, this.w, this.h)
		}else{
			var thickness = 1
			canvas.canvasCTX.fillStyle = '#DDD'
			canvas.canvasCTX.fillRect(this.x - (thickness), this.y - (thickness), this.w + (thickness * 2), this.h + (thickness * 2))
			canvas.canvasCTX.fillStyle = '#ff0000'
			canvas.canvasCTX.fillRect(this.x, this.y, this.w, this.h)
		}
	}
}

export default Tile
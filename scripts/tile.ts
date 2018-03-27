import {canvas, canvasCTX} from './canvas'
import {emitter} from './index' 

class Tile {
	public readonly w = 50
	public readonly h = 50
  
	public x = this.col * this.w
	public y = this.row * this.h
  
	constructor(public col: number, public row: number, public isSolid: boolean) {  
		emitter.on('update', this.update.bind(this))
	}

	update(){
		this.draw()
	}

	draw(){
		var thickness = 1
		canvasCTX.fillStyle = '#DDD'
	  	canvasCTX.fillRect(this.x - (thickness), this.y - (thickness), this.w + (thickness * 2), this.h + (thickness * 2))
	  	canvasCTX.fillStyle = this.isSolid ? '#aaa' : '#FFF'
		canvasCTX.fillRect(this.x, this.y, this.w, this.h)
	}
}

export default Tile
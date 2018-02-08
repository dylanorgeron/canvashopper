import {canvas, canvasCTX} from './canvas'

class Tile {

	w: number
	h: number
	col: number
	row: number
	x: number
	y: number
	isSolid: boolean

	constructor(col:number, row:number){
		this.w = 50;
		this.h = 50;
		this.col = col;
		this.row = row;
		this.x = this.col * this.w;
		this.y = this.row * this.h;
		this.isSolid = this.row == 9
	}

	update(){
		this.draw();
	}

	draw(){
		var thickness = 1;
		canvasCTX.fillStyle = '#DDD';
	  	canvasCTX.fillRect(this.x - (thickness), this.y - (thickness), this.w + (thickness * 2), this.h + (thickness * 2));
	  	canvasCTX.fillStyle = this.isSolid ? '#F1F1F1' : '#FFF';
		canvasCTX.fillRect(this.x, this.y, this.w, this.h);
	}
}

export default Tile
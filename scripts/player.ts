import {canvas, canvasCTX} from './canvas'
import {emitter} from './index'

class Player {
	public height = 40;
	public width = 15;
	public fallSpeed = 0;
	public jumpSpeed = 0;
	public canJump = true;	
	
	constructor(public x: number, public y: number){
		//draw on event 
		emitter.on('update', this.update.bind(this))
	}



	draw(){
		canvasCTX.fillStyle = '#000000';
		canvasCTX.fillRect(this.x, this.y, this.width, this.height);
	}

	update(){
		//pre movement y
		var currentY = this.y;
		//it is inescapable
		this.applyGravity();
		//if our y hasnt changed after applying gravity,
		//we are standing on ground and can jump
		this.canJump = currentY === this.y;

		//move player based on input
		if (keystate[RightArrow]) this.moveHorizontal(7);
		if (keystate[LeftArrow]) this.moveHorizontal(-7);
		if(keystate[Space] && this.canJump) this.jump();

		//all done, draw on canvas
		this.draw();
	}

	moveHorizontal(deltaX){
		var newXPos = this.x + deltaX;
		this.x = newXPos;
	}

	validatePosition(delta, rect){
		var collided;
		if(delta > 0){
			this.x++;
		}else{
			this.x--;
		}
		//collsion from left
		if(
			delta > 0 &&
			(this.x + this.width) >= rect.x &&
			(this.x + this.width) <= (rect.x + rect.width)
		){
			this.x -= delta;
			collided = true;
		}
		//collsion from right
		else if(
			delta < 0 &&
			this.x <= (rect.x + rect.width) &&
			this.x >= rect.x
		){
			this.x -= delta;
			collided = true;
		}
		return collided;
	}

	applyGravity(){
		//this will change as we fall
		//we need to know what it is at the start of the fall
		var floor = this.getFloor();
		var ceiling = this.getCeiling();
		//check if we need to fall
		if(this.jumpSpeed !== 0){
			if((this.y - this.jumpSpeed) <= ceiling){
				this.jumpSpeed = 0;
				this.y = ceiling;
			}else{
				this.y -= this.jumpSpeed;
				//slow jump by 3 with min of 0
				this.jumpSpeed = (this.jumpSpeed - 3) > 0 ? this.jumpSpeed - 1 : 0;
			}
		}else if(this.y < floor){
			//increase fall by 10 each frame up to 30 max
			this.fallSpeed = this.fallSpeed > 20 ? 20 : this.fallSpeed + 2;
			//fall with fallSpeed
			this.y += this.fallSpeed;
			if(this.y > floor){
				this.y = floor;
			}
		}else{
			this.fallSpeed = 0;
		}
	}

	jump(){
		if(this.jumpSpeed === 0){
			this.jumpSpeed = 25;
		}
	}

	getFloor(){
		var floorRow = level.height;
		var player = this;

		//determine x alignment
		var playerLeftTileLocation = Math.floor(player.x / 50);
		var playerRightTileLocation = Math.floor((player.x + player.width) / 50);
		var playerYAlignment = Math.ceil((player1.y + player.height) / 50);

		//
		var alignedTiles = level.tiles.filter(t => t.col === playerRightTileLocation || t.col === playerLeftTileLocation);

		alignedTiles.forEach(function(t){
			if(t.row < playerYAlignment && t.row < floorRow && t.isSolid){
				floorRow = t.row
			}
		});

		//convert floor row to px
		return (floorRow + 1) * 50;

	}

	getCeiling(){
		var ceiling = 0;
		var player = this;
		level.tiles.forEach(function(rect){
			if(rect.x < (player.x + player.width) && player.x < (rect.x + rect.width) && player.y >= rect.y){
				if(ceiling === 0){
					ceiling = rect.y + rect.height;
				}
			}
		})
		//if all else fails, put them at the bottom of the canvas
		return ceiling;
	}

}

export default Player
//level data
class Tile {
	constructor(col, row){
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

var level = {
	width: 15,
	height: 10,
	tiles: [],
}

for(var col = 0; col < level.width; col++){
	for (var row = 0; row < level.height; row++) {
		var tile = new Tile(col, row);
		level.tiles.push(tile)	
	}
}

//define keycodes for my own sanity
var LeftArrow = 37;
var UpArrow = 38;
var RightArrow = 39;
var DownArrow = 40;
var Space = 32;

//tracks keystates
var keystate = {};

//this tracks all entites that we may or may not need to draw
//logic for drawing only what is onscreen will be done in the object's update method
var entities = [];

class Player {
	constructor(x, y){
		entities.push(this)
		this.height = 40;
		this.width = 15;
		this.x = x;
		this.y = y;
		this.fallSpeed = 0;
		this.jumpSpeed = 0;
		this.canJump = true;
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

var initCavas = function(){
	canvas = document.getElementById('main-canvas');
	canvasCTX = canvas.getContext('2d');
}

var updateEntities = function(){
	canvasCTX.clearRect(0, 0, canvas.width, canvas.height);
	entities.forEach(function(entity){
		entity.update();
	});
}

var loadTiles = function(){
	level.tiles.forEach(function(tile){
		entities.push(tile);
	})
}

function main(){
	//register key listeners
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});

	//create canvas
	initCavas();

	//load tiles
	loadTiles(level.tiles);

	//create player
	player1 = new Player(10,10);

	//draw each frame
	var loop = function(){
		updateEntities();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);
}

window.onload = function(){
	main();
}

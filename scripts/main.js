//level data
var level = [
	{
		x: 300,
		y: 200,
		width: 100,
		height: 100,
		color: '#ddbbbb',
	},
	{
		x: 300,
		y: 300,
		width: 100,
		height: 100,
		color: '#ddbbbb',
	},
];

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

//classes
class Rectangle {
	constructor(x, y, width, height, color){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	update(){
		this.draw();
	}

	draw(){
		canvasCTX.fillStyle = this.color;
		canvasCTX.fillRect(this.x, this.y, this.width, this.height);
	}
}

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
		var player = this;
		var collided = false;
		level.forEach(function(rect){
			if(!collided){
				//check if this rectangle aligns with player on y axis
				if((player.y > rect.y &&
					player.y < (rect.y + rect.height))
					||
					((player.y + player.height) > rect.y &&
					(player.y + player.height) < (rect.y + rect.height))){

					if(deltaX > 0){
						for(var deltaToTest = 1; deltaToTest <= deltaX; deltaToTest++){
							if(!collided){
								collided = player.validatePosition(deltaToTest, rect);
							}
						}
					}else{
						for(var deltaToTest = -1; deltaToTest >= deltaX; deltaToTest--){
							if(!collided){
								collided = player.validatePosition(deltaToTest, rect);
							}
						}
					}
				}else{
					player.x += deltaX;
				}
			}
		});
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
		var floor = 0;
		var player = this;
		level.forEach(function(rect){
			if(rect.x < (player.x + player.width) && player.x < (rect.x + rect.width) && player.y <= rect.y){
				if(floor === 0){
					floor = rect.y - player.height;
				}
			}
		})
		//if all else fails, put them at the bottom of the canvas
		return floor === 0 ? canvas.height - this.height : floor;
	}

	getCeiling(){
		var ceiling = 0;
		var player = this;
		level.forEach(function(rect){
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

var loadLevel = function(data){
	data.forEach(function(obj){
		entities.push(new Rectangle(obj.x, obj.y, obj.width, obj.height, obj.color));
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

	//load level
	loadLevel(level);

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

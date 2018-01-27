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
	}

	draw(){
		canvasCTX.clearRect(0, 0, canvas.width, canvas.height);
		canvasCTX.fillRect(this.x, this.y, this.width, this.height);
	}

	update(){
		//move player based on input
		if (keystate[RightArrow]) this.x += 7;
		if (keystate[LeftArrow]) this.x -= 7;
		if(keystate[Space]) this.jump();

		//it is inescapable
		this.applyGravity();
		
		//all done, draw on canvas
		this.draw();
	}

	applyGravity(){
		//check if we need to fall
		if((this.y < canvas.height - this.height) > 0 && this.jumpSpeed === 0){
			//increase fall by 10 each frame up to 30 max
			this.fallSpeed = this.fallSpeed > 20 ? 20 : this.fallSpeed + 5;
			//fall with fallSpeed
			this.y += this.fallSpeed;
			if(this.y > canvas.height - this.height){
				this.y = canvas.height - this.height;
			}
		}else{
			this.fallSpeed = 0;
		}
	}

	jump(){

	}

}

var initCavas = function(){
	canvas = document.getElementById('main-canvas');
	canvasCTX = canvas.getContext('2d');
}

var updateEntities = function(){
	entities.forEach(function(entity){
		entity.update();
	});
}

function main(){

	//track which keys are pressed
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});

	//create canvas
	initCavas();

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

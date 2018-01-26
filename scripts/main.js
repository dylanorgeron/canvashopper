class Player {
	constructor(x, y){
		//from instantiation
		this.x = x;
		this.y = y;

		//player size is constant
	   	this.height = 40;
		this.width = 15;
	}

	draw(){
		canvasCTX.clearRect(0, 0, canvas.width, canvas.height);
		canvasCTX.fillRect(this.x, this.y, this.width, this.height);
	}
   	
}



var initCavas = function(){
	canvas = document.getElementById('main-canvas');
	canvasCTX = canvas.getContext('2d');
}

function main(){
	initCavas();
	player1 = new Player(10,10);
	player1.draw();
}

window.onload = function(){
	main();
}

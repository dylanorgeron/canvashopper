import {canvas, canvasCTX} from './canvas'
import './tile'
import './player'

//init level data
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

//define keycodes for my own sanity
const LeftArrow = 37;
const UpArrow = 38;
const RightArrow = 39;
const DownArrow = 40;
const Space = 32;

//tracks keystates
var keystate = {};

//this tracks all entites that we may or may not need to draw
//logic for drawing only what is onscreen will be done in the object's update method
var entities = [];

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
	const player1 = new Player(10,10);

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

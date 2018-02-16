import {canvas, canvasCTX} from './canvas'
import Player from './player'
import Tile from './tile';
import Level from './level'
import Keystates from './keystates';
import EventEmitter from 'eventemitter3'

export const emitter = new EventEmitter();

function main(){
	const keystates = new Keystates();
	const level = new Level(15, 10);
	const player1 = new Player(10,10);
	
	//register key listeners
	document.addEventListener("keydown", function(evt) {
		keystates.setKey(evt.keyCode, true);
	});
	document.addEventListener("keyup", function(evt) {
		keystates.setKey(evt.keyCode, false);
	});

	emitter.emit('update');

	//draw each frame
	var loop = function(){
		emitter.emit('update');
		window.requestAnimationFrame(loop);
	}
	window.requestAnimationFrame(loop);
}

window.onload = function(){
	main();
}

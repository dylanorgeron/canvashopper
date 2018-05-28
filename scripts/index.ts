import Canvas from './canvas'
import Debug from './debug'
import Player from './player'
import Tile from './tile'
import Level from './level'
import Keystates from './keystates'
import {EventEmitter} from 'eventemitter3'

export const emitter = new EventEmitter()
export const keystates = new Keystates()
//init level, 15 x 10
export const level = new Level(200,15)
//init player
export const player1 = new Player(level.playerStartX, level.playerStartY)
export const canvas = new Canvas()
export const debug = new Debug()

function main(){
	//register key listeners
	document.addEventListener("keydown", function(evt) {
		keystates.setKey(evt.keyCode, true)
	})
	document.addEventListener("keyup", function(evt) {
		keystates.setKey(evt.keyCode, false)
	})

	emitter.emit('update')

	//draw each frame
	var loop = function(){
		emitter.emit('update')
		window.requestAnimationFrame(loop)
	}
	window.requestAnimationFrame(loop)
}

window.onload = function(){
	main()
}

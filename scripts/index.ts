import Canvas from './canvas'
import Debug from './debug'
import {EventEmitter} from 'eventemitter3'
import Keystates from './keystates'
import Level from './level'
import Player from './player'
import Settings from './settings'

//dont reorder these
export const settings = new Settings()
export const emitter = new EventEmitter()
export const keystates = new Keystates()
export const level = new Level(24,24)
// export const player = new Player(level.playerStartX, level.playerStartY)
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
	document.getElementById("main-canvas").addEventListener('wheel', function(evt) {
		settings.zoom(evt)
	})
	document.getElementById("generate-button").addEventListener('click', function(evt){
		level.renderMap()
	})

	//calc physics at 60fps
	setInterval(function(){
		emitter.emit('updatePhysics')
	}, 16)

	//draw at 60 fps as well
	setInterval(function(){
		emitter.emit('renderObjects')
	}, 16)
}

window.onload = function(){
	main()
}

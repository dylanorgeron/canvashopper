import Canvas from './engine/canvas'
import Debug from './engine/debug'
import {EventEmitter} from 'eventemitter3'
import Keystates from './engine/keystates'
import Level from './map-generation/level'
import Player from './player'
import Settings from './settings'
import Camera from './engine/camera'

//dont reorder these
export const settings = new Settings()
export const emitter = new EventEmitter()
export const canvas = new Canvas()
export const camera = new Camera()
export const keystates = new Keystates()
export const level = new Level(settings.levelRoomCount)
export const player = new Player(settings.playerStart.x, settings.playerStart.y)
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
		level.generateMap()
	})

	emitter.emit('updatePhysics')
	emitter.emit('renderObjects')



	// calc physics, 32 for 30 fps, 16 for 60
	const framerate = 32
	setInterval(function(){
		emitter.emit('updatePhysics')
	}, framerate)

	//draw at 60 fps as well
	setInterval(function(){
		canvas.canvasCTX.clearRect(0,0, canvas.width, canvas.height)
		emitter.emit('renderObjects')
	}, framerate)
}

window.onload = function(){
	main()
}

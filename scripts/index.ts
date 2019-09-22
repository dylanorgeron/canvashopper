import Canvas from './canvas'
import Debug from './debug'
import EnemyLogicController from './enemy-logic-controller'
import {EventEmitter} from 'eventemitter3'
import Keystates from './keystates'
import Level from './level'
import Player from './player'

import Bow from './weapons/bow'

export const emitter = new EventEmitter()
export const keystates = new Keystates()
export const level = new Level(100,25)
export const player1 = new Player(level.playerStartX, level.playerStartY)
export const enemyLogicController = new EnemyLogicController()
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
	document.addEventListener("mousedown", function(evt) {
		player1.useItem(evt)
	})

	player1.addItem(new Bow(player1))

	//calc physics at 60fps
	var phyicsLoop = setInterval(function(){
		emitter.emit('updatePhysics')
	}, 16)

	//draw at 60 fps as well
	var renderLoop = setInterval(function(){
		emitter.emit('renderObjects')
	}, 16)
}

window.onload = function(){
	main()
}

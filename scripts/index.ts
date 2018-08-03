import Canvas from './canvas'
import Debug from './debug'
import EnemyLogicController from './enemy-logic-controller'
import {EventEmitter} from 'eventemitter3'
import Keystates from './keystates'
import Level from './level'
import Player from './player'
import Weapon from './weapon'
import PopupLogicController from './popup-logic-controller.';

export const emitter = new EventEmitter()
export const keystates = new Keystates()
export const level = new Level(100,25)
export const player1 = new Player(level.playerStartX, level.playerStartY)
export const enemyLogicController = new EnemyLogicController()
export const popupLogicController = new PopupLogicController()
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
		player1.useItem()
	})

	//give the player a test sword
	player1.addItem(new Weapon('Basic Sword', 'sword', 15, 25, 10, 30))

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

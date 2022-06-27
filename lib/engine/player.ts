import Drawable from './drawable'
import Camera from './camera'
import Canvas from './canvas'
import Keystates from './keystates'
import Settings from '../settings'
import Level from '../map-generation/level'
import DrawQueue from './draw-queue'
import EventEmitter from 'eventemitter3'
const settings = new Settings()
class Player extends Drawable {
	public height = 5
	public width = 5
	public direction = 'right'
	public moveSpeed: number = 10

	constructor(
		public x: number,
		public y: number,
		private camera: Camera,
		private canvas: Canvas,
		private keystates: Keystates,
		private level: Level,
		public drawQueue: DrawQueue,
		public emitter: EventEmitter
	) {
		super(drawQueue, emitter)
		this.zIndex = 2
		camera.originX = x - canvas.width / 2
		camera.originY = y - canvas.height / 2
	}

	draw() {
		//draw player
		this.canvas.canvasCTX.fillStyle = '#ff0000'
		this.canvas.canvasCTX.fillRect(
			this.canvas.width / 2 - this.width / 2,
			this.canvas.height / 2 - this.height / 2,
			this.width,
			this.height
		)
	}

	update() {
		//distance to move
		let delta = 0
		//move player based on input
		if (this.keystates.RightArrowIsActive) {
			this.direction = 'right'
			delta = this.moveSpeed
			this.moveHorizontal(delta)
		}
		if (this.keystates.LeftArrowIsActive) {
			this.direction = 'left'
			delta = this.moveSpeed * -1
			this.moveHorizontal(delta)
		}
		if (this.keystates.UpArrowIsActive) {
			this.direction = 'up'
			delta = this.moveSpeed * -1
			this.moveVertical(delta)
		}
		if (this.keystates.DownArrowIsActive) {
			this.direction = 'down'
			delta = this.moveSpeed
			this.moveVertical(delta)
		}
	}

	moveVertical(delta: number) {
		//move down
		if (delta > 0) {
			for (let i = 1; i <= delta; i++) {
				this.y++
				if (!this.validatePosition()) {
					this.y--
					break
				}
				this.camera.originY++
			}
			//move up
		} else {
			for (let i = -1; i >= delta; i--) {
				this.y--
				if (!this.validatePosition()) {
					this.y++
					break
				}
				this.camera.originY--
			}
		}
	}

	moveHorizontal(delta: number) {
		//move right
		if (delta > 0) {
			for (let i = 1; i <= delta; i++) {
				this.x++
				if (!this.validatePosition()) {
					this.x--
					break
				}
				this.camera.originX++
			}
			//move left
		} else {
			for (let i = -1; i >= delta; i--) {
				this.x--
				if (!this.validatePosition()) {
					this.x++
					break
				}
				this.camera.originX--
			}
		}
	}

	validatePosition() {
		let positionIsValid = true
		//get all tiles player is occupying, check for collisions
		//col the player's left side is in
		const playerLeftAlignment = Math.floor(this.x / settings.tileSize);
		//col the player's right side is in
		const playerRightAlignment = Math.floor((this.x + this.width) / settings.tileSize);
		//row the player's top is in
		const playerTopAlignment = Math.floor(this.y / settings.tileSize);
		//row the player's bottom is in
		//-1 prevents floor from stopping movement
		const playerBottomAlignment = Math.floor((this.y + this.height - 1) / settings.tileSize);


		//check level data and see if any of the intersected tiles are solid
		//at most, four tiles to check
		//top left
		if (this.level.isTileSolid(playerLeftAlignment, playerTopAlignment)) positionIsValid = false
		//top right
		if (this.level.isTileSolid(playerRightAlignment, playerTopAlignment)) positionIsValid = false
		//bottom left
		if (this.level.isTileSolid(playerLeftAlignment, playerBottomAlignment)) positionIsValid = false
		//bottom right
		if (this.level.isTileSolid(playerRightAlignment, playerBottomAlignment)) positionIsValid = false

		//return validity of position
		return positionIsValid;
	}
}

export default Player
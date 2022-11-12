import Drawable from './drawable'
import Settings from '../settings'
import GameInstance from '../../frontend/scripts/game-instance'
const settings = new Settings()

class Player extends Drawable {
	public height = 5
	public width = 5
	public direction = 'right'
	public moveSpeed: number = 10
	public x: number
	public y: number

	constructor(public gameInstance: GameInstance) {
		super(gameInstance)
		this.zIndex = 2
		this.x = 0
		this.y = 0
		this.gameInstance.camera.originX = this.x - this.gameInstance.canvas.width / 2
		this.gameInstance.camera.originY = this.y - this.gameInstance.canvas.height / 2
	}

	draw() {
		//draw player
		this.gameInstance.canvas.canvasCTX.fillStyle = '#ff0000'
		this.gameInstance.canvas.canvasCTX.fillRect(
			this.gameInstance.canvas.width / 2 - this.width / 2,
			this.gameInstance.canvas.height / 2 - this.height / 2,
			this.width,
			this.height
		)
	}

	update() {
		//distance to move
		let delta = 0
		//move player based on input
		if (this.gameInstance.keystates.RightArrowIsActive) {
			this.direction = 'right'
			delta = this.moveSpeed
			this.moveHorizontal(delta)
		}
		if (this.gameInstance.keystates.LeftArrowIsActive) {
			this.direction = 'left'
			delta = this.moveSpeed * -1
			this.moveHorizontal(delta)
		}
		if (this.gameInstance.keystates.UpArrowIsActive) {
			this.direction = 'up'
			delta = this.moveSpeed * -1
			this.moveVertical(delta)
		}
		if (this.gameInstance.keystates.DownArrowIsActive) {
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
				this.gameInstance.camera.originY++
			}
			//move up
		} else {
			for (let i = -1; i >= delta; i--) {
				this.y--
				if (!this.validatePosition()) {
					this.y++
					break
				}
				this.gameInstance.camera.originY--
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
				this.gameInstance.camera.originX++
			}
			//move left
		} else {
			for (let i = -1; i >= delta; i--) {
				this.x--
				if (!this.validatePosition()) {
					this.x++
					break
				}
				this.gameInstance.camera.originX--
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
		if (this.gameInstance.level.isTileSolid(playerLeftAlignment, playerTopAlignment)) positionIsValid = false
		//top right
		if (this.gameInstance.level.isTileSolid(playerRightAlignment, playerTopAlignment)) positionIsValid = false
		//bottom left
		if (this.gameInstance.level.isTileSolid(playerLeftAlignment, playerBottomAlignment)) positionIsValid = false
		//bottom right
		if (this.gameInstance.level.isTileSolid(playerRightAlignment, playerBottomAlignment)) positionIsValid = false

		//return validity of position
		return positionIsValid;
	}
}

export default Player
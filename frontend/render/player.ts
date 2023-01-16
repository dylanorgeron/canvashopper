import Drawable from './drawable'
import Settings from '../../lib/settings'
import GameInstance from './game-instance'
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
        document.getElementById("debug").innerHTML = `
            <div>Player x: ${this.x}</div>
            <div>Player y: ${this.y}</div>
        `
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
			}
			//move up
		} else {
			for (let i = -1; i >= delta; i--) {
				this.y--
				if (!this.validatePosition()) {
					this.y++
					break
				}
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
			}
			//move left
		} else {
			for (let i = -1; i >= delta; i--) {
				this.x--
				if (!this.validatePosition()) {
					this.x++
					break
				}
			}
		}
	}

	validatePosition() {
		return true
	}
}

export default Player
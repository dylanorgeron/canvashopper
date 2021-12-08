import {
	emitter,
	keystates,
	level,
	canvas,
	debug,
	settings,
	camera
} from './index'

class Player {
	public id = 1
	public height = 5
	public width = 5
	public direction = 'right'
	public moveSpeed: number = 5

	constructor(
		public x: number, 
		public y: number
	){
		camera.originX = x - canvas.width / 2
		camera.originY = y - canvas.height / 2
		emitter.on('updatePhysics', this.update.bind(this))
		emitter.on('renderObjects', this.draw.bind(this))
	}

	draw(){
		//draw player
		canvas.canvasCTX.fillStyle = '#000000'
		canvas.canvasCTX.fillRect(
			canvas.width / 2 - this.width /2,
			canvas.height / 2 - this.height /2,
			this.width, 
			this.height
		)
	}

	update(){
		//distance to move
		let delta = 0
		//move player based on input
		if (keystates.RightArrowIsActive) {
			this.direction = 'right'
			delta = this.moveSpeed
			this.moveHorizontal(delta)
		} 
		if (keystates.LeftArrowIsActive) {
			this.direction = 'left'
			delta = this.moveSpeed * -1
			this.moveHorizontal(delta)
		}
		if (keystates.UpArrowIsActive) {
			this.direction = 'up'
			delta = this.moveSpeed * -1
			this.moveVertical(delta)
		}
		if (keystates.DownArrowIsActive) {
			this.direction = 'down'
			delta = this.moveSpeed
			this.moveVertical(delta)
		}

		//log player stats to debugger
		debug.playerXPosition = this.x
		debug.playerYPosition = this.y
	}

	moveVertical(delta: number){
		//move down
		if(delta > 0){
			for (let i = 1; i <= delta; i++) {
				this.y++
				if(!this.validatePosition()){
					this.y--
					break
				}
				camera.originY++
			}
		//move up
		}else{
			for (let i = -1; i >= delta; i--) {
				this.y--
				if(!this.validatePosition()){
					this.y++
					break
				}
				camera.originY--
			}
		}
	}

	moveHorizontal(delta: number){
		//move right
		if(delta > 0){
			for (let i = 1; i <= delta; i++) {
				this.x++
				if(!this.validatePosition()){
					this.x--
					break
				}
				camera.originX++
			}
		//move left
		}else{
			for (let i = -1; i >= delta; i--) {
				this.x--
				if(!this.validatePosition()){
					this.x++
					break
				}
				camera.originX--
			}
		}
	}

	validatePosition(){
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
		if(level.isTileSolid(playerLeftAlignment, playerTopAlignment)) positionIsValid = false
		//top right
		if(level.isTileSolid(playerRightAlignment, playerTopAlignment)) positionIsValid = false
		//bottom left
		if(level.isTileSolid(playerLeftAlignment, playerBottomAlignment)) positionIsValid = false
		//bottom right
		if(level.isTileSolid(playerRightAlignment, playerBottomAlignment)) positionIsValid = false

		//return validity of position
		return positionIsValid;
	}
}

export default Player
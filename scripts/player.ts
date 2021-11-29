import {
	emitter,
	keystates,
	level,
	canvas,
	debug,
	settings
} from './index'
import Popup from './popup'

class Player {
	public id = 1
	public height = 5
	public width = 5
	public fallSpeed0 = 0
	public jumpSpeed = 0
	public canJump = true	
	public xForCamera = 0
	public yForCamera = 0
	public direction = 'right'
	public activeAttackHitboxWidth = 0
	public activeAttackHitboxHeight = 0
	public activeAttackDuration = 0
	public enemiesHit:number[] = []
	public hitPoints: number = 100
	public knockback: number = 0
	public knockbackDirection: string = ""
	public moveSpeed: number = 5

	constructor(
		public x: number, 
		public y: number
	){
		emitter.on('updatePhysics', this.update.bind(this))
		emitter.on('renderObjects', this.draw.bind(this))
	}

	draw(){
		//draw player
		canvas.canvasCTX.fillStyle = '#000000'
		canvas.canvasCTX.fillRect(this.xForCamera, this.yForCamera, this.width, this.height)
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

		if(level.offsetX === 0){
			this.xForCamera = this.x
		}
		if(level.offsetY === 0){
			this.yForCamera = this.y
		}

		//log player stats to debugger
		debug.playerXPosition = this.x
		debug.playerYPosition = this.y
		debug.direction = this.direction
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
				//set level offset to keep player centered on canvas
				if(this.y + (this.width / 2) > canvas.width / 2){
					level.offsetY++
				}
			}
		//move up
		}else{
			for (let i = -1; i >= delta; i--) {
				this.y--
				if(!this.validatePosition()){
					this.y++
					break
				}
				//set level offset to keep player centered on canvas
				if(level.offsetY > 0){
					level.offsetY--
				}
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
				//set level offset to keep player centered on canvas
				if(this.x + (this.width / 2) > canvas.width / 2){
					level.offsetX++
				}
			}
		//move left
		}else{
			for (let i = -1; i >= delta; i--) {
				this.x--
				if(!this.validatePosition()){
					this.x++
					break
				}
				//set level offset to keep player centered on canvas
				if(level.offsetX > 0){
					level.offsetX--
				}
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

		if(
			playerBottomAlignment < 0 ||
			playerTopAlignment < 0 ||
			playerLeftAlignment < 0 ||
			playerRightAlignment < 0 
		) return false;

		//check level data and see if any of the intersected tiles are solid
		//at most, four tiles to check
		//top left
		if(level.tiles[playerLeftAlignment][playerTopAlignment].isSolid) positionIsValid = false
		//top right
		if(level.tiles[playerRightAlignment][playerTopAlignment].isSolid) positionIsValid = false
		//bottom left
		if(level.tiles[playerLeftAlignment][playerBottomAlignment].isSolid) positionIsValid = false
		//bottom right
		if(level.tiles[playerRightAlignment][playerBottomAlignment].isSolid) positionIsValid = false

		//return validity of position
		return positionIsValid;
	}

	applyHit(damage: number, knockback: number, knockbackDirection: string){
		//logic for decrementing hitpoints
		this.hitPoints -= damage

		//send him flying
		this.knockback = knockback
		this.jumpSpeed = 8
		this.knockbackDirection = knockbackDirection

		//hit splat
		new Popup(damage.toString(), this.x, this.y,)

		//death
		if (this.hitPoints <= 0) {
			console.log('Oh dear, you are dead!')
		}
	}
}

export default Player
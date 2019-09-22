import {
	emitter,
	level,
	canvas,
	player1,
	enemyLogicController
} from './index'
import Popup from './popup'

const tileSize = 25

class Enemy {
	public id = 0
	public height = 40
	public width = 15
	public fallSpeed = 0
	public jumpSpeed = 0
	public canJump = true
	public hitPoints = 50
	public maxHitPoints = 50
	public moveSpeed = Math.floor(Math.random() * 3) + 1
	public knockback = 0
	public knockbackDirection = ""
	public direction = ""
	public attackCooldown = 0
	constructor(
		public x: number,
		public y: number
	) {
		//set the id to the next number
		this.id = enemyLogicController.enemies.length ?
			enemyLogicController.enemies[enemyLogicController.enemies.length-1].id + 1 :
			0
		//draw on event 
		emitter.on('updatePhysics', this.update.bind(this))
		emitter.on('renderObjects', this.draw.bind(this))

	}

	draw() {
		if (this.hitPoints <= 0) return
		canvas.canvasCTX.fillStyle = '#ff0000';
		canvas.canvasCTX.font = "14px Arial"
		canvas.canvasCTX.fillRect(this.x - level.offsetX, this.y, this.width, this.height);
		canvas.canvasCTX.fillText(`HP: ${this.hitPoints}/${this.maxHitPoints}`, this.x - level.offsetX - 25, this.y - 10)
	}

	update() {
		//TODO optimize this
		if (this.hitPoints <= 0) return
		if(this.attackCooldown > 0) this.attackCooldown--

		//modify delta by knockback, if applicable
		let delta = this.moveSpeed
		if(this.knockback){
			if(this.knockbackDirection === this.direction){
				delta += this.knockback
			}else{
				delta -= this.knockback
			}
			//knockback decay
			this.knockback--
		}

		//pre movement y
		var currentY = this.y;
		//it is inescapable
		this.applyGravity();

		//try and get the player
		if (Math.abs(player1.x - this.x) > 20) {
			if (player1.x > this.x) {
				//move right
				this.direction = "right"
				this.moveHorizontal(delta)
			} else {
				//move right
				this.direction = "left"
				this.moveHorizontal(delta * -1)
			}
		} else if (this.attackCooldown == 0 && (this.y === player1.y)){
			//were pretty close, lets give em the left
			this.attackCooldown = 60
			player1.applyHit(20, 10, this.direction)
		}
	}

	moveHorizontal(delta: number) {
		//move right
		if (delta > 0) {
			for (let i = 1; i <= delta; i++) {
				this.x++
				if (!this.validatePosition(i)) {
					this.x--
					break
				}
			}
			//move left
		} else {
			for (let i = -1; i >= delta; i--) {
				this.x--
				if (!this.validatePosition(i)) {
					this.x++
					break
				}
			}
		}
	}

	jump() {
		if (this.jumpSpeed === 0) {
			this.jumpSpeed = 20;
		}
	}

	validatePosition(delta: number) {
		const player = this
		let positionIsValid = true
		//get all tiles player is occupying, check for collisions
		//col the player's left side is in
		const playerLeftAlignment = Math.floor(player.x / tileSize);
		//col the player's right side is in
		const playerRightAlignment = Math.floor((player.x + player.width) / tileSize);
		//row the player's top is in
		const playerTopAlignment = Math.floor(player.y / tileSize);
		//row the player's bottom is in
		//-1 prevents floor from stopping movement
		const playerBottomAlignment = Math.floor((player.y + player.height - 1) / tileSize);

		//iterate level data and see if any of the intersected tiles are solid
		positionIsValid = level.tiles.filter(t =>
			(t.col === playerRightAlignment || t.col === playerLeftAlignment) &&
			(t.row === playerTopAlignment || t.row === playerBottomAlignment) &&
			t.isSolid
		).length === 0 &&
			player.x >= 0 && player.x <= level.width * level.tiles[0].w - player.width - 1

		//return validity of position
		return positionIsValid;
	}

	applyGravity() {
		//this will change as we fall
		//we need to know what it is at the start of the fall
		var floor = this.getFloor();
		var ceiling = this.getCeiling();
		//check if we need to fall
		if (this.jumpSpeed !== 0) {
			if ((this.y - this.jumpSpeed) <= ceiling) {
				this.jumpSpeed = 0;
				this.y = ceiling;
			} else {
				this.y -= this.jumpSpeed;
				//slow jump by 3 with min of 0
				this.jumpSpeed = (this.jumpSpeed - 3) > 0 ? this.jumpSpeed - 1 : 0;
			}
		} else if (this.y + this.height < floor) {
			//increase fall by 10 each frame up to 30 max
			this.fallSpeed = this.fallSpeed > 20 ? 20 : this.fallSpeed + 2;
			//fall with fallSpeed
			this.y += this.fallSpeed;
			//see if we will land on the floor next frame
			if (this.y + this.height + this.fallSpeed + 2 > floor) {
				this.y = floor - this.height;
				this.fallSpeed = 0;
			}
		} else {
			this.fallSpeed = 0;
		}
	}

	getFloor() {
		const player = this;
		let floorRow = level.height;

		//tile the player's left side is in
		const playerLeftTileLocation = Math.floor(player.x / tileSize);
		//tile the player's right side is in
		const playerRightTileLocation = Math.floor((player.x + player.width) / tileSize);
		//tile the bottom of the player is in
		const playerYAlignment = Math.ceil((player.y + player.height) / tileSize);

		//get tiles under player
		const underTiles = level.tiles.filter(t =>
			(t.col === playerRightTileLocation || t.col === playerLeftTileLocation)
			&& t.row === playerYAlignment
		)

		//find floor in tiles
		underTiles.forEach(t => {
			if (t.isSolid) {
				floorRow = t.row
			}
		})
		//convert floor row to px
		return ((floorRow) * tileSize);
	}

	getCeiling() {
		const player = this;
		let ceilingRow = 0;

		//tile the player's left side is in
		const playerLeftTileLocation = Math.floor(player.x / tileSize);
		//tile the player's right side is in
		const playerRightTileLocation = Math.floor((player.x + player.width) / tileSize);
		//tile the top of the player is in
		const playerYAlignment = Math.ceil((player.y) / tileSize);

		//get tiles above player
		const overTiles = level.tiles.filter(t =>
			(t.col === playerRightTileLocation || t.col === playerLeftTileLocation)
			&& t.row < playerYAlignment - 1
		)

		//find floor in tiles
		overTiles.forEach(t => {
			if (t.isSolid) {
				ceilingRow = t.row
			}
		})
		//convert floor row to px
		return ((ceilingRow + 1) * tileSize);
	}

	applyHit(damage: number, knockback: number, knockbackDirection: string) {
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
			const index = enemyLogicController.enemies.findIndex(e => e.id == this.id)
			enemyLogicController.enemies.splice(index, 1)
		}
	}
}

export default Enemy

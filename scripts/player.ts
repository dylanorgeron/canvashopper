import {emitter, keystates, level, canvas, debug} from './index'
import Tile from './tile';

class Player {
	public height = 40;
	public width = 15;
	public fallSpeed = 0;
	public jumpSpeed = 0;
	public canJump = true;	
	
	constructor(public x: number, public y: number){
		//draw on event 
		emitter.on('update', this.update.bind(this))
	}

	draw(){
		canvas.canvasCTX.fillStyle = '#000000';
		canvas.canvasCTX.fillRect(this.x, this.y, this.width, this.height);
	}

	update(){
		//pre movement y
		var currentY = this.y;
		//it is inescapable
		this.applyGravity();
		//if our y hasnt changed after applying gravity,
		//we are standing on ground and can jump
		this.canJump = currentY === this.y;

		//move player based on input
		if (keystates.RightArrowIsActive) this.moveHorizontal(7);
		if (keystates.LeftArrowIsActive) this.moveHorizontal(-7);
		if(keystates.SpaceIsActive && this.canJump) this.jump();

		//log player stats to debugger
		debug.playerXPostition = this.x;
		debug.playerYPosition = this.y;

		//all done, draw on canvas
		this.draw();
	}

	moveHorizontal(delta: number){
		//move right
		if(delta > 0){
			for (let i = 1; i <= delta; i++) {
				this.x++
				if(!this.validatePosition(i)){
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
				if(!this.validatePosition(i)){
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

	jump(){
		if(this.jumpSpeed === 0){
			this.jumpSpeed = 20;
		}
	}

	validatePosition(delta: number){
		const player = this
		let positionIsValid = true
		//get all tiles player is occupying, check for collisions
		//col the player's left side is in
		const playerLeftAlignment = Math.floor(player.x / 50);
		//col the player's right side is in
		const playerRightAlignment = Math.floor((player.x + player.width) / 50);
		//row the player's top is in
		const playerTopAlignment = Math.floor(player.y / 50);
		//row the player's bottom is in
		//-1 prevents floor from stopping movement
		const playerBottomAlignment = Math.floor((player.y + player.height - 1) / 50);

		//iterate level data and see if any of the intersected tiles are solid
		positionIsValid = level.tiles.filter(t => 
			(t.col === playerRightAlignment || t.col === playerLeftAlignment) &&
			(t.row === playerTopAlignment || t.row === playerBottomAlignment)
			&& t.isSolid
		).length === 0

		//return validity of position
		return positionIsValid;
	}

	applyGravity(){
		//this will change as we fall
		//we need to know what it is at the start of the fall
		var floor = this.getFloor();
		var ceiling = this.getCeiling();
		//check if we need to fall
		if(this.jumpSpeed !== 0){
			if((this.y - this.jumpSpeed) <= ceiling){
				this.jumpSpeed = 0;
				this.y = ceiling;
			}else{
				this.y -= this.jumpSpeed;
				//slow jump by 3 with min of 0
				this.jumpSpeed = (this.jumpSpeed - 3) > 0 ? this.jumpSpeed - 1 : 0;
			}
		}else if(this.y + this.height < floor){
			//increase fall by 10 each frame up to 30 max
			this.fallSpeed = this.fallSpeed > 20 ? 20 : this.fallSpeed + 2;
			//fall with fallSpeed
			this.y += this.fallSpeed;
			//see if we will land on the floor next frame
			if(this.y + this.height + this.fallSpeed + 2 > floor){
				this.y = floor - this.height;
				this.fallSpeed = 0;
			}
		}else{
			this.fallSpeed = 0;
		}
	}

	getFloor(){
		const player = this;
		let floorRow = level.height;

		//tile the player's left side is in
		const playerLeftTileLocation = Math.floor(player.x / 50);
		//tile the player's right side is in
		const playerRightTileLocation = Math.floor((player.x + player.width) / 50);
		//tile the bottom of the player is in
		const playerYAlignment = Math.ceil((player.y + player.height) / 50);

		//get tiles under player
		const underTiles = level.tiles.filter(t => 
			(t.col === playerRightTileLocation || t.col === playerLeftTileLocation)
			&& t.row === playerYAlignment
		)
		
		//find floor in tiles
		underTiles.forEach(t => {
			if(t.isSolid){
				floorRow = t.row
			}
		})
		//convert floor row to px
		return ((floorRow) * 50);
	}

	getCeiling(){
		const player = this;
		let ceilingRow = 0;

		//tile the player's left side is in
		const playerLeftTileLocation = Math.floor(player.x / 50);
		//tile the player's right side is in
		const playerRightTileLocation = Math.floor((player.x + player.width) / 50);
		//tile the top of the player is in
		const playerYAlignment = Math.ceil((player.y) / 50);

		//get tiles above player
		const overTiles = level.tiles.filter(t => 
			(t.col === playerRightTileLocation || t.col === playerLeftTileLocation)
			&& t.row < playerYAlignment - 1
		)
		
		//find floor in tiles
		overTiles.forEach(t => {
			if(t.isSolid){
				ceilingRow = t.row
			}
		})
		//convert floor row to px
		return ((ceilingRow + 1) * 50);
	}

}

export default Player
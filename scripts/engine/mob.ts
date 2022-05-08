import Drawable from "./drawable"
import { player, camera, canvas } from '../index'
import Coordinate from "../map-generation/coordinate"

export default class Mob extends Drawable{
    public height = 5
    public width = 5
    public direction = 'right'
    public moveSpeed = 1

    

    constructor(
        public x: number, 
		public y: number
    ){
        super()
        this.zIndex = 2
    }

    public draw() {
        if(player.x > this.x){
            this.x += this.moveSpeed
        }else{
            this.x -= this.moveSpeed
        }
        if(player.y > this.y){
            this.y += this.moveSpeed
        }else{
            this.y -= this.moveSpeed
        }

        let origin = new Coordinate(
			this.x - camera.originX,
			this.y - camera.originY)
        const onScreen = 
			origin.x + this.width < 0 &&
			origin.x < canvas.width &&
			origin.y + this.height < 0 &&
			origin.y < canvas.height
		if (!onScreen) {
            canvas.canvasCTX.fillStyle = '#FF000'
            canvas.canvasCTX.fillRect(
                origin.x,
                origin.y,
                this.width,
                this.height
            )
        }
    }
    public update() {

    }
}
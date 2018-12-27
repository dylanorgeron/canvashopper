import Weapon from './weapon'
import Player from '../player'
import Arrow from './arrow'
import { debug, canvas, emitter, level, enemyLogicController } from '../index'

class Bow extends Weapon {
    public enemiesHit: number[] = []
    
    //pixels/frame
    public missileSpeed = 15
    
    constructor(player: Player) {
        super(
            //who owns the weapon
            player,
            //isActive
            false,
            //display name
            'Makeshift Bow',
            //group name
            'bow',
            //damage
            25,
            //attack duration
            10,
            //cooldown between use
            0,
            //hitbox width
            0,
            //hitbox height
            0,
            //hitbox duration in ms
            30,
            //relative to player
            true
        )
        emitter.on('update', this.update.bind(this))
    }

    draw() {
        //decrement for this frame
        this.cooldown--
        //color blue
        canvas.canvasCTX.fillStyle = '#0055ff'
        //get the starting x pos based on left or right face
        const hbStartX = this.player.direction === 'right' ?
            this.player.xForCamera + this.player.width :
            this.player.xForCamera - 20
        //height
        const hbStartY = this.player.y + this.player.height / 2
        //draw it
        canvas.canvasCTX.fillRect(
            hbStartX,
            hbStartY,
            20,
            10
        )
    }

    update() {
        if (this.cooldown > 0) {
            this.draw()
        }
    }

    use(evt: MouseEvent) {
        if(this.cooldown == 0){
            this.cooldown = this.attackDuration
            
            //transform click coords into coords relative to the canvas
            var clickY = evt.clientY - canvas.canvasElement.offsetTop
            var clickX = evt.clientX - canvas.canvasElement.offsetLeft
            
            //calc triangle
            var opposite = (clickY - this.player.y) * -1
            var adjacent = (clickX - this.player.xForCamera)
            const angle = Math.tan(opposite/adjacent)
            //calc velocities
            var yVelocity = Math.round(this.missileSpeed * Math.sin(angle))
            var xVelocity = Math.round(this.missileSpeed * Math.cos(angle))

            console.log("y velocity: " + yVelocity)
            console.log("x velocity: " + xVelocity)
            new Arrow(this.player, this.damage, xVelocity, yVelocity)
        }
    }
}

export default Bow
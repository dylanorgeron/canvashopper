import Weapon from './weapon'
import Player from '../player'
import Arrow from './arrow'
import { debug, canvas, emitter, level, enemyLogicController } from '../index'

class Bow extends Weapon {
    public enemiesHit: number[] = []

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

    use() {
        if(this.cooldown == 0){
            console.log('firing bow')
            this.cooldown = this.attackDuration
            new Arrow(this.player, this.damage)
        }
    }
}

export default Bow
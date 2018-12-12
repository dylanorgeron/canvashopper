import Weapon from './weapon'
import Player from '../player'
import { debug, canvas, emitter, level, enemyLogicController } from '../index'

class Sword extends Weapon {
    public enemiesHit: number[] = []

    constructor(player: Player) {
        super(
            //who owns the weapon
            player,
            //isActive
            false,
            //display name
            'Basic Sword',
            //group name
            'sword',
            //damage
            25,
            //attack duration
            20,
            //cooldown between use
            0,
            //hitbox width
            30,
            //hitbox height
            10,
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
            this.player.xForCamera - this.hitboxWidth
        //height
        const hbStartY = this.player.y + this.player.height / 2
        //draw it
        canvas.canvasCTX.fillRect(
            hbStartX,
            hbStartY,
            this.hitboxWidth,
            this.hitboxHeight
        )
    }

    update() {
        if (this.cooldown > 0) {
            const hitboxYRange: number[] = []
            const hitboxYStart = this.player.y + this.player.height / 2
            const hitboxYEnd = this.hitboxHeight + this.player.y + this.player.height / 2
            for (let i = hitboxYStart; i <= hitboxYEnd; i++) {
                hitboxYRange.push(i)
            }
            const hitboxX = this.player.direction === 'right' ?
                this.player.xForCamera + this.player.width :
                this.player.xForCamera - this.hitboxWidth
            const hitboxXRange: number[] = []
            for (
                let i = hitboxX + level.offsetX;
                i <= hitboxX + this.hitboxWidth + level.offsetX;
                i++
            ) {
                hitboxXRange.push(i)
            }

            //iterate the spawned enemeies, check if attack hitbox intersects any
            enemyLogicController.enemies.forEach(e => {
                //enemy ranges
                const enemyYRange: number[] = []
                for (let i = e.y; i <= e.y + e.height; i++) {
                    enemyYRange.push(i)
                }
                const enemyXRange: number[] = []
                for (let i = e.x; i <= e.x + e.width; i++) {
                    enemyXRange.push(i)
                }
                const isYAligned = hitboxYRange.filter(y => -1 !== enemyYRange.indexOf(y)).length > 0;
                const isXAligned = hitboxXRange.filter(x => -1 !== enemyXRange.indexOf(x)).length > 0;

                const enemyCanBeHit = this.enemiesHit.indexOf(e.id) === -1

                if (isYAligned && isXAligned && enemyCanBeHit) {
                    this.enemiesHit.push(e.id)
                    e.applyHit(this)
                }
            })
            this.draw()
        }else{
            this.enemiesHit = []
        }
    }

    use() {
        this.cooldown = this.attackDuration
    }
}

export default Sword
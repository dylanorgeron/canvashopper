import { debug, canvas, emitter, level, enemyLogicController } from '../index'
import Player from '../player';

class Arrow {
    public x = 0
    public y = 0
    public width = 20
    public height = 3
    public direction = ''
    public ttl = 600
    public damage = 10
    private fallspeed = 0
    constructor(player: Player, damage: number, public xVelocity: number, public yVelocity: number) {
        emitter.on('update', this.update)
        this.x = player.x
        this.y = player.y + player.height / 2
        this.direction = player.direction
        this.damage += damage
    }

    draw() {
        canvas.canvasCTX.fillStyle = '#ccaa00';
        canvas.canvasCTX.fillRect(this.x - level.offsetX, this.y, this.width, this.height);
    }
    
    update = this._update.bind(this)

    _update() {
        this.ttl--
        if (this.ttl > 0) {
            this.fallspeed += .1
            const direcitonModifier = this.direction === 'left' ? -1 : 1
            this.x += this.xVelocity
            this.y = this.y - this.yVelocity + this.fallspeed
            this.checkEnemyCollision()
            this.draw()
        } else {
            emitter.off('update', this.update)
        }
    }

    checkEnemyCollision(){
        const hitboxYRange: number[] = []
        const hitboxYStart = this.y + this.height
        const hitboxYEnd = this.height + this.y
        for (let i = hitboxYStart; i <= hitboxYEnd; i++) {
            hitboxYRange.push(i)
        }
        const hitboxXEnd = this.direction === 'right' ?
            this.x + this.width :
            this.x - this.width
        const hitboxXRange: number[] = []
        for (
            let i = hitboxXEnd;
            i <= hitboxXEnd + this.width;
            i++
        ) {
            hitboxXRange.push(i)
        }
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

            if (isYAligned && isXAligned) {
                e.applyHit(this.damage)
                this.ttl = 0
            }
        })
    }

}

export default Arrow
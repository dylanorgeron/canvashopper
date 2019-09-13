import { debug, canvas, emitter, level, enemyLogicController } from '../index'
import Player from '../player';

class Arrow {
    public x = 0
    public y = 0
    public lastX = 0
    public lastY = 0
    public width = 20
    public height = 3
    public direction = ''
    public ttl = 300
    public damage = 10
    private fallSpeed = 0
    private angle = 0
    constructor(player: Player, damage: number, public xVelocity: number, public yVelocity: number, angle: number) {
        emitter.on('update', this.update)
        this.x = player.x
        this.lastX = player.x
        this.y = player.y + player.height / 2
        this.lastY = player.y + player.height / 2
        this.direction = player.direction
        this.damage += damage
        this.angle = angle
    }

    draw() {
		canvas.canvasCTX.fillStyle = '#552200';
        canvas.canvasCTX.fillRect(this.x - level.offsetX, this.y, this.width, this.height)
    }
    
    update = this._update.bind(this)

    _update() {
        this.ttl--
        if (this.ttl > 0) {
            this.fallSpeed += .1
            this.lastX = this.x
            this.lastY = this.y
            this.checkEnemyCollision(this.xVelocity, this.yVelocity + this.fallSpeed)
            this.checkGeometryCollision(this.xVelocity, this.yVelocity + this.fallSpeed)
            this.x += this.xVelocity
            this.y = this.y - this.yVelocity + this.fallSpeed
            this.draw()
            // console.log(this.angle)
        } else {
            emitter.off('update', this.update)
        }
    }

    checkGeometryCollision(deltaX: number, deltaY: number){

    }

    checkEnemyCollision(deltaX: number, deltaY: number){
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
import { debug, canvas, emitter, level, enemyLogicController } from '../index'
import Player from '../player';
const tileSize = 25

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
    private knockback = 0
    constructor(
        player: Player,
        damage: number,
        public xVelocity: number,
        public yVelocity: number,
        angle: number,
        knockback: number) {
        emitter.on('update', this.update)
        this.x = player.x
        this.lastX = player.x
        this.y = player.y + player.height / 2
        this.lastY = player.y + player.height / 2
        this.direction = player.direction
        this.damage += damage
        this.angle = angle
        this.knockback = knockback
    }

    draw() {
        canvas.canvasCTX.fillStyle = '#552200';
        canvas.canvasCTX.fillRect(this.x - level.offsetX, this.y, this.width, this.height)
    }

    update = this._update.bind(this)

    _update() {
        this.ttl--
        // console.log(this.angle)
        if (this.ttl > 0) {
            this.fallSpeed += .1
            this.lastX = this.x
            this.lastY = this.y
            this.checkForCollision(this.xVelocity, this.yVelocity + this.fallSpeed)
            if (this.ttl > 0) {
                this.x += this.xVelocity
                this.y = this.y - this.yVelocity + this.fallSpeed
                this.draw()
            } else {
                emitter.off('update', this.update)
            }
        } else {
            emitter.off('update', this.update)
        }
    }

    checkForCollision(deltaX: number, deltaY: number) {
        const hitboxYRange: number[] = []
        const hitboxYStart = this.y + this.height
        const hitboxYEnd = this.height + this.y
        for (let i = hitboxYStart; i <= hitboxYEnd; i++) {
            hitboxYRange.push(Math.round(i))
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
        //iterate level data and see if any of the intersected tiles are solid
        //find tile for upper left corner
        const tileLeftAlignment = Math.floor(this.x / tileSize);
        const tileRightAlignment = Math.floor((this.x + this.width) / tileSize);
        const tileTopAlignment = Math.floor(this.y / tileSize);
        const tileBottomAlignment = Math.floor((this.y + this.height) / tileSize);
        const positionIsValid = level.tiles.filter(t =>
            (t.col === tileRightAlignment || t.col === tileLeftAlignment) &&
            (t.row === tileTopAlignment || t.row === tileBottomAlignment) &&
            t.isSolid
        ).length === 0 &&
            this.x >= 0 && this.x <= level.width * level.tiles[0].w - this.width - 1

        if (!positionIsValid) {
            this.ttl = 0
            return
        }

        //check for enemies hit
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
                e.applyHit(this.damage, this.knockback, this.direction)
                this.ttl = 0
            }
        })
    }

}

export default Arrow
import { debug, canvas, emitter, level, enemyLogicController } from '../index'
import Player from '../player';

class Arrow {
    public x = 0
    public y = 0
    public direction = ''
    public ttl = 60
    constructor(player: Player, damage: number) {
        emitter.on('update', this.update)
        this.x = player.x
        this.y = player.y + player.height / 2
        this.direction = player.direction
    }

    draw() {
        canvas.canvasCTX.fillStyle = '#00ffcc';
        canvas.canvasCTX.fillRect(this.x - level.offsetX, this.y, 20, 3);
    }
    
    update = this._update.bind(this)

    _update() {
        this.ttl--
        if (this.ttl > 0) {
            this.x += this.direction == 'left' ? -10 : 10
            this.draw()
        } else {
            emitter.off('update', this.update)
        }
    }
}

export default Arrow
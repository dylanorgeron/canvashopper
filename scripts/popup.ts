import { canvas, level, emitter } from ".";

class Popup{
    public xVelocity = 1
    public yVelocity = -1
    public color = '255, 255, 255'
    public alpha = 1
    public duration = 40

    constructor(
        public text: string,
        public x: number,
        public y: number,
    ){
        emitter.on('updatePhysics', this.update)
        emitter.on('renderObjects', this.draw)
    }

    update = this._update.bind(this)
    draw = this._draw.bind(this)

    _update(){
        this.duration--
        if(this.duration > 10){
            this.x += this.xVelocity
            this.y += this.yVelocity
        }
        if(this.duration === 0)        {
            emitter.off('updatePhysics', this.update)
            emitter.off('renderObjects', this.draw)
        }
    }

    _draw(){
        canvas.canvasCTX.fillStyle = this.color
        canvas.canvasCTX.fillText(this.text, this.x - level.offsetX, this.y)
    }
}

export default Popup
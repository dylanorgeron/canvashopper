import { canvas, level } from ".";

class Popup{
    public xVelocity = 1
    public yVelocity = -1
    public color = '255, 255, 255'
    public alpha = 1
    public duration = 40

    constructor(
        public text: string,
        public x: number,
        public y: number
    ){
    }

    update(){
        this.duration--
        if(this.duration > 10){
            this.x += this.xVelocity
            this.y += this.yVelocity
        }
        this.draw()
    }

    draw(){
        canvas.canvasCTX.fillStyle = this.color
        canvas.canvasCTX.fillText(this.text, this.x - level.offsetX, this.y)
    }
}

export default Popup
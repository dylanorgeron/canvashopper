import { canvas } from ".";

class Popup{
    public xVelocity = 1
    public yVelocity = -1
    public color = '#000000'
    public duration = 20

    constructor(
        public text: string,
        public x: number,
        public y: number
    ){

    }

    update(){
        this.duration--
        this.x += this.xVelocity
        this.y += this.yVelocity
        this.draw()
    }

    draw(){
        canvas.canvasCTX.fillStyle = this.color;
		canvas.canvasCTX.font="20px Georgia";
		canvas.canvasCTX.fillText(this.text, this.x, this.y);
    }
}

export default Popup
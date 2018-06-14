import {emitter, debug} from './index'

class Debug{
    public playerXPostition = 0
    public playerYPosition = 0
    public levelXOffset = 0
    public levelYOffset = 0
    public temp = 0

	constructor(){
		//draw on event 
		emitter.on('update', this.update.bind(this))
    }
    update(){
        const debuggerPanel = document.getElementById('debugger')
        if(debuggerPanel){
            var html = 
            `
            Player X Position: ${this.playerXPostition}
            <br>
            Player Y Position: ${this.playerYPosition}
            <br>
            Level X Offset: ${this.levelXOffset}
            <br>
            Level Y Offset: ${this.levelYOffset}
            <br>
            Distance: ${this.temp}
            `
            debuggerPanel.innerHTML = html
        }
    }
}

export default Debug
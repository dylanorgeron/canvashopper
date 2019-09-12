import {emitter, debug} from './index'

class Debug{
    public playerXPosition = 0
    public playerYPosition = 0
    public levelXOffset = 0
    public levelYOffset = 0
    public weapon = ''
    public direction = ''

	constructor(){
		//draw on event 
		emitter.on('update', this.update.bind(this))
    }
    update(){
        const debuggerPanel = document.getElementById('debugger')
        if(debuggerPanel){
            var html = 
            `
            Player X Position: ${this.playerXPosition}
            <br>
            Player Y Position: ${this.playerYPosition}
            <br>
            Level X Offset: ${this.levelXOffset}
            <br>
            Level Y Offset: ${this.levelYOffset}
            <br>
            Facing: ${this.direction}
            <br><br>
            Weapon: ${this.weapon}
            `
            debuggerPanel.innerHTML = html
        }
    }
}

export default Debug
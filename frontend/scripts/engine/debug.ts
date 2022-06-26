import {emitter} from '../index'

class Debug{
    public playerXPosition = 0
    public playerYPosition = 0
    public cameraX = 0
    public cameraY = 0
    public weapon = ''
	constructor(){
		//draw on event 
		emitter.on('renderObjects', this.update.bind(this))
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
            Camera X: ${this.cameraX}
            <br>
            Camera Y: ${this.cameraY}
            <br>
            `
            debuggerPanel.innerHTML = html
        }
    }
}

export default Debug
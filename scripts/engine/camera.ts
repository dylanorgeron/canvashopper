import {emitter, debug} from '../index' 

class Camera {
    public originX: number = 0
    public originY: number = 0
	constructor(
	) {  
		emitter.on('renderObjects', () => {
			debug.cameraX = this.originX
			debug.cameraY = this.originY
		})
	}
}

export default Camera
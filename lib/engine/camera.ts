import EventEmitter from "eventemitter3"

class Camera {
    public originX: number = 0
    public originY: number = 0
	constructor(private emitter: EventEmitter
	) {  
		emitter.on('renderObjects', () => {})
	}
}

export default Camera
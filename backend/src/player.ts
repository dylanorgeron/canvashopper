class Player {
	public height = 5
	public width = 5
	public direction = 'right'
	public moveSpeed: number = 10
	public x: number
	public y: number

	constructor(public id: string) {
		this.x = 0
		this.y = 0
	}

	moveHorizontal(delta: number) {
		//move right
		if (delta > 0) {
			for (let i = 1; i <= delta; i++) {
				this.x++
				if (!this.validatePosition()) {
					this.x--
					break
				}
			}
			//move left
		} else {
			for (let i = -1; i >= delta; i--) {
				this.x--
				if (!this.validatePosition()) {
					this.x++
					break
				}
			}
		}
	}

	validatePosition() {
		return true
	}
}

export default Player
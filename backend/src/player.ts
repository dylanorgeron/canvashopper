class Player {
	public height = 5
	public width = 5
	public direction = 'right'
	public moveSpeed: number = 10
	public x: number = 0
	public y: number = 0
	

	constructor(
		public id: string,
		public username: string
		) {
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
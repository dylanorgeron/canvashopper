import Settings from '../../lib/settings'
const settings = new Settings()

class Tile{
	public w = settings.tileSize
	public h = settings.tileSize

	//position on map in pixels
	public x: number
	public y: number

	public fillColor = ""
	public img = ""
	constructor(
		public col: number,
		public row: number,
		public isSolid: boolean,
	) {
		this.x = this.col * this.w
		this.y = this.row * this.h
	}
}

export default Tile
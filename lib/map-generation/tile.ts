import Settings from '../settings'
import Drawable from '../engine/drawable'
const settings = new Settings()

class Tile extends Drawable{
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
		super()
		this.zIndex = 1
		this.x = this.col * this.w
		this.y = this.row * this.h
	}
}

export default Tile
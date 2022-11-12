import EventEmitter from 'eventemitter3'
import Tile from '../map-generation/tile'
import Settings from '../settings'
import DrawQueue from './draw-queue'
import Drawable from './drawable'
const settings = new Settings()

class _DrawableTile extends Tile{}

class DrawableTile extends Drawable{
	public w = settings.tileSize
	public h = settings.tileSize

	//position on map in pixels
	public x: number
	public y: number

	public fillColor = ""
	public img = ""
	constructor(
        public dq: DrawQueue,
        public emmiter: EventEmitter,
		public col: number,
		public row: number,
		public isSolid: boolean,
	) {
        super(dq, emmiter)
		this.x = this.col * this.w
		this.y = this.row * this.h
	}
}

export default DrawableTile
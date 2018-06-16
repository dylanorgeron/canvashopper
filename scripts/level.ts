import {emitter, debug} from './index'
import Tile from './tile'

class Level {
    //offset data is stored in the level so that each level can load the player in at a different point,
    //rather than starting the player at 0,0 offset
    public offsetX = 0
    public offsetY = 0
    public playerStartX = 100
    public playerStartY = 300

    public tiles:Tile[] = []
    constructor(
        public readonly width: number, 
        public readonly height: number
    ){
        //listen for updates
        emitter.on('update', this.update.bind(this))
        
        //this is where we add tiles to the level, it will be redone at some point
        for(let col = 0; col < this.width; col++){
            for (let row = 0; row < this.height; row++) {
                const tile = new Tile(col, row, false)
                if(row >= 14){
                    tile.isSolid = true
                }
                if(row === 9 && (col % 3 === 0 || col % 4 === 0)){
                    tile.isSolid = true
                }
                if(col === 9 && row === 13) tile.isSolid = true
                this.tiles.push(tile)	
            }
        }
    }
    update(){
        debug.levelXOffset = this.offsetX
        debug.levelYOffset = this.offsetY
    }
}

export default Level
import Tile from './tile'

class Level {
    public tiles:Tile[] = []
    constructor(public readonly width: number, public readonly height: number){
        
        //this is where we add tiles to the level, it will be redone at some point
        for(let col = 0; col < this.width; col++){
            for (let row = 0; row < this.height; row++) {
                const tile = new Tile(col, row);
                this.tiles.push(tile)	
            }
        }
        
    }
}

export default Level
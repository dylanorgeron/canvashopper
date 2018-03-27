import Tile from './tile'

class Level {
    public tiles:Tile[] = []
    constructor(public readonly width: number, public readonly height: number){
        
        //this is where we add tiles to the level, it will be redone at some point
        for(let col = 0; col < this.width; col++){
            for (let row = 0; row < this.height; row++) {
                const tile = new Tile(col, row, false);
                if(row >= 8){
                    tile.isSolid = true;
                }
                if(row === 5 && col > 4 && col < 8){
                    tile.isSolid = true;
                }
                if(col == 5 && row > 5 && col < 8){
                    tile.isSolid = true;
                }
                this.tiles.push(tile)	
            }
        }
        
    }
}

export default Level
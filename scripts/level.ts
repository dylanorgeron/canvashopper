import {emitter, debug, settings, level} from './index'
import Tile from './tile'

class Level {
    //offset data is stored in the level so that each level can load the player in at a different point,
    //rather than starting the player at 0,0 offset
    public offsetX = 0
    public offsetY = 0
    public playerStartX = 100
    public playerStartY = 300
    private tileSize = 0

    //used for generating the map
    private cursor: number[] = [0,0]
    
    public tiles:Tile[][] = []
    constructor(
        //width in number of tiles
        public readonly width: number, 
        //height in number of tiles
        public readonly height: number
    ){
        //listen for updates
        emitter.on('renderObjects', this.update.bind(this))
        this.tileSize = settings.tileSize
        this.renderMap()
        
    }
    update(){
        debug.levelXOffset = this.offsetX
        debug.levelYOffset = this.offsetY
        if(this.tileSize != settings.tileSize){
            this.tileSize = settings.tileSize
            this.renderMap()
        }
    }

    renderMap(){
        //tabula rasa
        for(let col = 0; col < this.width; col++){
            var rowTiles: Tile[] = []
            for (let row = 0; row < this.height; row++) {
                rowTiles.push(new Tile(col, row, true))
            }
            this.tiles.push(rowTiles)
        }
        //carve a path
        var canMove = true
        var lastTile: number[] = []
        var moves = 0
        while(canMove){
            moves++
            if(moves > 100){
                console.log("exceeded 100 moves")
                break;
            } 
            this.carveTile(this.cursor)
            var options = new DirectionOptions()

            /*
            we always start top right, so if there's no starting
            tile, we can't go up or left
            */
            if(!lastTile.length){
                options.up = false
                options.left = false
            }

            //check out of bounds
            if(this.cursor[0] == 0){
                //at left boundary
                options.left = false
            }
            if(this.cursor[1] == 0){
                //at top boundary
                options.up = false
            }
            if(this.cursor[0] == this.width - 1){
                //at right boundary
                options.right = false
            }
            if(this.cursor[1] == this.height - 1){
                //at bottom boundary
                options.down = false
            }

            //whats left
            var possibleMoves = options.getPossibleMoves()
            //out of moves
            if(!possibleMoves.length){
                canMove = false
                console.log("out of moves")
            }else{
                console.log("can move " + possibleMoves.join())
                //set cursor
                var direction = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
                console.log("moving " + direction)
                this.setCursorForDirection(direction)
                console.log("cursor now at " + this.cursor)
            }
        }
    }
    
    carveTile(cursor: number[]){
        this.tiles[cursor[0]][cursor[1]].isSolid = false
    }
    
    setCursorForDirection(direction: string){
        switch (direction) {
            case 'up':
                this.cursor[1]--
                break;
            case 'down':
                this.cursor[1]++
                break;
            case 'left':
                this.cursor[0]--
                break;
            case 'right':
                this.cursor[0]++
                break;
        }
    }
}

class DirectionOptions {
    public up: boolean = true
    public down: boolean = true
    public left: boolean = true
    public right: boolean = true

    canMove(){
        return this.up || this.down || this.left || this.right
    }

    getPossibleMoves(){
        var options: string[] = []
        if(this.up) options.push('up')
        if(this.down) options.push('down')
        if(this.right) options.push('right')
        if(this.left) options.push('left')
        return options
    }
}

export default Level
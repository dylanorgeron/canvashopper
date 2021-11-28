import {emitter, debug, settings, level} from './index'
import Tile from './tile'

class Level {
    //offset data is stored in the level so that each level can load the player in at a different point,
    //rather than starting the player at 0,0 offset
    public offsetX = 0
    public offsetY = 0
    public playerStartX = 10
    public playerStartY = 10
    private tileSize = 0

    //used for generating the map
    private cursor: Cursor = new Cursor(0,0)
    
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
        this.cursor.x = 0
        this.cursor.y = 0
        this.tiles = []
        for(let col = 0; col < this.width; col++){
            var rowTiles: Tile[] = []
            for (let row = 0; row < this.height; row++) {
                rowTiles.push(new Tile(col, row, true))
            }
            this.tiles.push(rowTiles)
        }
        this.tiles[0][0].isSolid = false;
        //carve a path
        var pathTiles: Cursor[] = []
        var moves = 0
        var extraMove = ""
        while(true){
            //loop detection
            moves++
            if(moves > 100){
                console.log("exceeded 100 moves")
                break;
            } 

            var options = new DirectionOptions()

            //we always start top right, so if there's no starting tile, we can't go up or left
            if(!pathTiles.length){
                options.up = false
                options.left = false
            }

            //check out of bounds
            if(this.cursor.x == 0){
                //at left boundary
                options.left = false
            }
            if(this.cursor.y == 0){
                //at top boundary
                options.up = false
            }
            if(this.cursor.x == this.width - 1){
                //at right boundary
                options.right = false
            }
            if(this.cursor.y == this.height - 1){
                //at bottom boundary
                options.down = false
            }

            //check whats already been carved
            if(this.cursor.x == 0 || !this.tiles[this.cursor.x - 1][this.cursor.y].isSolid){
                //left tile is already hollow
                options.left = false
            }
            if(this.cursor.y == 0 || !this.tiles[this.cursor.x][this.cursor.y -1 ].isSolid){
                //up tile is already hollow
                options.up = false
            }
            if(this.cursor.y == this.height -1 || !this.tiles[this.cursor.x][this.cursor.y + 1].isSolid){
                //down tile is already hollow
                options.down = false
            }
            if(this.cursor.x == this.width -1  || !this.tiles[this.cursor.x + 1][this.cursor.y].isSolid){
                //right tile is already hollow
                options.right = false
            }

            //whats left
            var possibleMoves = options.getPossibleMoves()
            //out of moves
            if(!possibleMoves.length){
                console.log("out of moves")
                break
            }
            // console.log("can move " + possibleMoves.join())

            //check if we changed directions
            var newDirection = ""
            if(pathTiles.length > 2){
                var cornerCursor = pathTiles[pathTiles.length - 3]
                var changedDirection = 
                this.cursor.x != cornerCursor.x && 
                this.cursor.y != cornerCursor.y
                var newDirection = ""
                if(changedDirection){
                    if(this.cursor.x != cornerCursor.x){
                        if(this.cursor.x > cornerCursor.x){
                            newDirection = "right"
                        }else{
                            newDirection = "left"
                        }
                    }
                    if(this.cursor.y != cornerCursor.y){
                        if(this.cursor.y > cornerCursor.y){
                            newDirection = "down"
                        }else{
                            newDirection = "up"
                        }
                    }
                }
                extraMove = newDirection
            }
            //pick a direction based on availability and past movement
            var direction = possibleMoves.indexOf(newDirection) > 0 ? newDirection
            : possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
            
            if(extraMove && possibleMoves.includes(extraMove)){
                direction = extraMove
                extraMove = ""
            }

            this.setCursorForDirection(direction)
            this.carveTile(this.cursor)
            pathTiles.push(new Cursor(this.cursor.x, this.cursor.y))
        }
    }
    
    carveTile(cursor: Cursor){
        this.tiles[cursor.x][cursor.y].isSolid = false
    }
    
    setCursorForDirection(direction: string){
        switch (direction) {
            case 'up':
                this.cursor.y--
                break;
            case 'down':
                this.cursor.y++
                break;
            case 'left':
                this.cursor.x--
                break;
            case 'right':
                this.cursor.x++
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

class Cursor{ 
    public x: number = 0
    public y: number = 0
    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }
}

export default Level
import RoomSize from "./room-size"
import Direction from "./direction"
import Portal from "./portal"
import Coordinate from "./coordinate"
import Tile from "./tile"
import Settings from "../settings"

class Room{
    public portals: Portal[] = []
    public tiles: Tile[] = []
    public w: number = 0
    public h: number = 0
    
    constructor(public size: RoomSize, public origin:Coordinate, public enteredFrom: Direction){
        //determine sizes
        switch (size) {
            case RoomSize.small:
                this.w = 3
                this.h = 3
                break;
            case RoomSize.medium:
                this.w = 5
                this.h = 5
                break;
            case RoomSize.large:
                this.w = 7
                this.h = 7
                break;
            default:
                break;
        }
        //determine portal coordinates
        //portals are drawn in the middle of each wall
        //up
        this.portals.push(new Portal(origin.x + (this.w - 1) / 2, origin.y, Direction.up))
        //down
        this.portals.push(new Portal(origin.x + (this.w - 1) / 2, origin.y + this.h -1, Direction.down))
        //left
        this.portals.push(new Portal(origin.x, origin.y + (this.h - 1) / 2, Direction.left))
        //right
        this.portals.push(new Portal(origin.x + this.w - 1, origin.y + (this.h - 1) / 2, Direction.right))

    }

    generateTiles(){
        //generate tiles
        //inner walkable area
        for(let col = this.origin.x; col < this.w + this.origin.x; col++){
            for(let row = this.origin.y; row < this.h + this.origin.y; row++){
                this.tiles.push(new Tile(col, row, false))
            }
        }
    }

    drawRoom(){

    }
}

export default Room
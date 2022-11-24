import Direction from "./direction"
import Portal from "./portal"
import Tile from "./tile"

class Hallway{
    public tiles: Tile[] = []
    
    constructor(public entrance: Portal, public exit: Portal, width: number){
        const directionOfTravel = entrance.direction
        switch(directionOfTravel){
            case Direction.up:
                this.tiles.push(new Tile(entrance.x, entrance.y - 1, false))
                this.tiles.push(new Tile(entrance.x, entrance.y - 2, false))
                break;
            case Direction.down:
                this.tiles.push(new Tile(entrance.x, entrance.y + 1, false))
                this.tiles.push(new Tile(entrance.x, entrance.y + 2, false))
                break;
            case Direction.right:
                this.tiles.push(new Tile(entrance.x + 1, entrance.y, false))
                this.tiles.push(new Tile(entrance.x + 2, entrance.y, false))
                break;
            case Direction.left:
                this.tiles.push(new Tile(entrance.x - 1, entrance.y, false))
                this.tiles.push(new Tile(entrance.x - 2, entrance.y, false))
                break;
            default:
                break;
        }
    }
}

export default Hallway
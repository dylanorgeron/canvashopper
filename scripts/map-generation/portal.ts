import Coordinate from "./coordinate"
import Direction from "./direction"

class Portal extends Coordinate{
    public direction: Direction
    
    constructor(x: number, y: number, direction: Direction){
        super(x, y)
        this.direction = direction
    }
}

export default Portal
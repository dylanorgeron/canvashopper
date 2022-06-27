import Coordinate from "./coordinate"
import Direction from "./direction"

class Portal extends Coordinate{
    //which wall is the portal on
    public direction: Direction
    
    //entrance or exit?
    public isEntrance: boolean = false
    public isExit: boolean = false

    constructor(x: number, y: number, direction: Direction){
        super(x, y)
        this.direction = direction
    }
}

export default Portal
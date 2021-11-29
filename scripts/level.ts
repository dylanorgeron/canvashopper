import { LanguageVariant, SignatureKind } from 'typescript'
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
        this.tiles = []
        for(let col = 0; col < this.width; col++){
            var rowTiles: Tile[] = []
            for (let row = 0; row < this.height; row++) {
                rowTiles.push(new Tile(col, row, true))
            }
            this.tiles.push(rowTiles)
        }

        //generation vars
        let canMove = true
        let moves = 0
        let rooms: Room[] = []
        
        //hardcode first room
        rooms.push(new Room(RoomSize.large, new Coordinate(0,0), Direction.left))
        this.carveRoom(rooms[0])

        while(canMove){
            moves++ 
            if(moves >= 1){
                canMove = false
            } 
            let possibleRooms = this.getPossibleRooms(rooms[rooms.length - 1])
            let chosenRoom = possibleRooms[3]
            console.log("exiting from " + chosenRoom.previousRoomDirection)
            rooms.push(chosenRoom)
            this.carveRoom(chosenRoom)
            this.carveConnection(chosenRoom)
        }
        console.log(rooms)
    }

    carveConnection(room: Room){
        let ingress = room.portals.filter(p => p.direction == room.previousRoomDirection)[0]
        switch (room.previousRoomDirection) {
            case Direction.up:
                this.tiles[ingress.x][ingress.y - 1].isSolid = false
                this.tiles[ingress.x][ingress.y - 2].isSolid = false
                break;
            default:
                break;
        }
    }
    
    carveRoom(room: Room){
        //carve tiles
        for(let row = 0; row < room.h; row++){
            for(let col = 0; col < room.w; col++){
                //carve it
                this.tiles[room.origin.x + row][room.origin.y + col].isSolid = false
            }
        }
        room.portals.forEach(p => {
            // this.tiles[p.x][p.y].fillColor = "#ffaaaa"
        })
        return room
    }

    getPossibleRooms(room: Room){
        let possibleRooms: Room[] = []

        //check each portal
        room.portals.forEach(portal => {
            //draw new rooms based on ingress
            //keep in mind the ingress is the centerpoint of the room
            //adjust accordingly for new origin
            RoomPrefabs.forEach(prefab => {
                let proposedOrigin = new Coordinate(0,0)
                //get origin for ingress and prefab
                switch (portal.direction) {
                    //portal direction is the direction of travel
                    //entering new room from bottom
                    case Direction.up:
                        proposedOrigin.x = portal.x - (prefab.w - 1) / 2
                        proposedOrigin.y = portal.y + 3
                        break;
                    //entering new room from top
                    case Direction.down:
                        proposedOrigin.x = portal.x - (prefab.w - 1) / 2
                        proposedOrigin.y = portal.y + 3
                    break;
                    default:
                        break;
                }
                //generate new room from proposed origin
                let newRoom = new Room(
                    RoomSize.large,
                    new Coordinate(proposedOrigin.x, proposedOrigin.y),
                    this.getOppositeDirection(portal.direction))
                //check room collision against carved tiles
                if(proposedOrigin.x >= 0 && proposedOrigin.y >= 0){
                    possibleRooms.push(newRoom)
                }
            })
        })
        return possibleRooms
    }

    getOppositeDirection(d: Direction){
        switch (d) {
            case Direction.up:
                return Direction.down
            case Direction.down:
                return Direction.up
            case Direction.left:
                return Direction.right
            case Direction.right:
                return Direction.left

        }
    }
}



class RoomPrefabConfig{
    constructor(
        public name: RoomSize,
        public w: number,
        public h: number
    ){}
}

enum RoomSize{
    small = 0,
    medium = 1,
    large = 2
}

enum Direction{
    up = "up",
    down = "down",
    left = "left",
    right = "right"
}

class Room{
    public portals: Portal[] = []
    public w: number = 0
    public h: number = 0
    
    constructor(public size: RoomSize, public origin:Coordinate, public previousRoomDirection: Direction){
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
        //up
        this.portals.push(new Portal(origin.x + (this.w - 1) / 2, origin.y, Direction.up))
        //down
        this.portals.push(new Portal(origin.x + (this.w - 1) / 2, origin.y + this.h -1, Direction.down))
        //left
        this.portals.push(new Portal(origin.x, origin.y + (this.h - 1) / 2, Direction.left))
        //right
        this.portals.push(new Portal(origin.x + this.w - 1, origin.y + (this.h - 1) / 2, Direction.right))
    }
}

class Coordinate{
    constructor(public x: number, public y: number){}
}

class Portal extends Coordinate{
    public direction: Direction
    
    constructor(x: number, y: number, direction: Direction){
        super(x, y)
        this.direction = direction
    }
}

const RoomPrefabs: RoomPrefabConfig[] = [
    new RoomPrefabConfig(RoomSize.large, 7, 7),
    new RoomPrefabConfig(RoomSize.medium, 5, 5),
    new RoomPrefabConfig(RoomSize.small, 3, 3),
]

export default Level
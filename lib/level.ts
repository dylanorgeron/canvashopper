import Tile from './map-generation/tile'
import Room from './map-generation/room'
import Direction from './map-generation/direction'
import { roomPrefabs } from './map-generation/room-prefab-config'
import Coordinate from './map-generation/coordinate'
import RoomSize from './map-generation/room-size'
import Hallway from './map-generation/hallway'

class Level {
    //offset data is stored in the level so that each level can load the player in at a different point,
    //rather than starting the player at 0,0 offset
    public rooms: Room[] = []
    public hallways: Hallway[] = []
    constructor(roomCount: number = 5){
        this.generateMap(roomCount)
    }

    generateMap(roomCount: number){
        //generation vars
        let canMove = true
        let moves = 0
        this.rooms = []
        
        //hardcode first room
        let firstRoom = new Room(RoomSize.large, new Coordinate(0,0), Direction.up)
        firstRoom.getEntrancePortal().isEntrance = false
        this.rooms.push(firstRoom)

        //generate rooms until we reach the room limit
        while(canMove){
            moves++ 
            if(moves >= roomCount){
                canMove = false
            } 

            let previousRoom = this.rooms[this.rooms.length - 1]
            let possibleRooms = this.getPossibleRooms(previousRoom)
            let chosenRoom = possibleRooms[Math.floor(Math.random() * possibleRooms.length)]
            
            previousRoom.portals.filter(p => 
                p.direction === this.getOppositeDirection(chosenRoom.enteredFrom)
            )[0].isExit = true

            this.rooms.push(chosenRoom)
            
            this.hallways.push(new Hallway(
                previousRoom.getExitPortal(),
                chosenRoom.getEntrancePortal(), 
                1)
            )

        }
        this.rooms.forEach((room, i) => {
            room.generateTiles()
            //populate mobs
            //director.populateRoom(room, i)
        })
    }

     getPossibleRooms(room: Room): Room[]{
        let possibleRooms: Room[] = []

        //check each portal
        room.portals.forEach(portal => {
            //draw new rooms based on ingress
            //keep in mind the ingress is the centerpoint of the room
            //adjust accordingly for new origin
            roomPrefabs.forEach(prefab => {
                let proposedOrigin = new Coordinate(0,0)
                //get origin for ingress and prefab
                switch (portal.direction) {
                    //portal direction is the direction of travel
                    case Direction.up:
                        proposedOrigin.x = portal.x - (prefab.w - 1) / 2
                        proposedOrigin.y = portal.y - 2 - prefab.h
                        break;
                    case Direction.down:
                        proposedOrigin.x = portal.x - (prefab.w - 1) / 2
                        proposedOrigin.y = portal.y + 3
                    break;
                    case Direction.left:
                        proposedOrigin.x = portal.x - prefab.w - 2
                        proposedOrigin.y = portal.y - (prefab.h - 1) / 2
                    break;
                    case Direction.right:
                        proposedOrigin.x = portal.x + 3
                        proposedOrigin.y = portal.y - (prefab.h - 1) / 2
                    break;
                    default:
                        break;
                }
                //generate new room from proposed origin
                let newRoom = new Room(
                    prefab.size,
                    new Coordinate(proposedOrigin.x, proposedOrigin.y),
                    this.getOppositeDirection(portal.direction)
                )
                //check room collision against carved tiles
                if(proposedOrigin.x >= 0 && proposedOrigin.y >= 0){
                    if(portal.direction == Direction.down || portal.direction == Direction.right){
                        possibleRooms.push(newRoom)
                    }
                }
            })
        })
        return possibleRooms
    }

    getOppositeDirection(d: Direction): Direction{
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

    getTileByCoords(x: number, y:number): Tile | null{
        let tile: Tile | null = null
        this.rooms.forEach(r => {
            r.tiles.forEach(t => {
                if(t.col == x && t.row == y){
                    tile = t
                }
            })
        })
        this.hallways.forEach(h => {
            h.tiles.forEach(t => {
                if(t.col == x && t.row == y){
                    tile = t
                }
            })
        })
        return tile
    }

    isTileSolid(x: number, y: number): boolean{
        const tile = this.getTileByCoords(x, y)
        return tile == null || tile.isSolid
    }
}

export default Level
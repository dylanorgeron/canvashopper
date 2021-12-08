import {emitter, debug, settings} from '../index'
import Tile from './tile'
import Room from './room'
import Direction from './direction'
import { roomPrefabs } from './room-prefab-config'
import Coordinate from './coordinate'
import RoomSize from './room-size'

class Level {
    //offset data is stored in the level so that each level can load the player in at a different point,
    //rather than starting the player at 0,0 offset
    public offsetX = 0
    public offsetY = 0
    public rooms: Room[] = []
    constructor(roomCount: number = 5){
        //listen for updates
        emitter.on('renderObjects', this.update.bind(this))
        this.generateMap(roomCount)
    }
    update(){
    }

    generateMap(roomCount: number){
        //generation vars
        let canMove = true
        let moves = 0
        this.rooms = []
        
        //hardcode first room
        let firstRoom = new Room(RoomSize.large, new Coordinate(0,0), Direction.left)
        firstRoom.generateTiles()
        this.rooms.push(firstRoom)

        //generate rooms until we reach the room limit
        while(canMove){
            moves++ 
            if(moves >= roomCount){
                canMove = false
            } 
            let possibleRooms = this.getPossibleRooms(this.rooms[this.rooms.length - 1])
            let chosenRoom = possibleRooms[Math.floor(Math.random() * possibleRooms.length)]
            chosenRoom.generateTiles()
            console.log(chosenRoom)
            
            this.rooms.push(chosenRoom)
        }
        console.log(this.rooms)
    }

    // carveConnection(room: Room){
    //     let ingress = room.portals.filter(p => p.direction == room.enteredFrom)[0]
    //     switch (room.enteredFrom) {
    //         case Direction.up:
    //             this.tiles[ingress.x][ingress.y - 1].isSolid = false
    //             this.tiles[ingress.x][ingress.y - 1].fillColor = "#aaffaa"
    //             this.tiles[ingress.x][ingress.y - 2].isSolid = false
    //             this.tiles[ingress.x][ingress.y - 2].fillColor = "#aaffaa"
    //             break;
    //         case Direction.down:
    //             this.tiles[ingress.x][ingress.y + 1].isSolid = false
    //             this.tiles[ingress.x][ingress.y + 1].fillColor = "#aaffaa"
    //             this.tiles[ingress.x][ingress.y + 2].isSolid = false
    //             this.tiles[ingress.x][ingress.y + 2].fillColor = "#aaffaa"
    //             break;
    //         case Direction.right:
    //             this.tiles[ingress.x + 1][ingress.y].isSolid = false
    //             this.tiles[ingress.x + 1][ingress.y].fillColor = "#aaffaa"
    //             this.tiles[ingress.x + 2][ingress.y].isSolid = false
    //             this.tiles[ingress.x + 2][ingress.y].fillColor = "#aaffaa"
    //             break;
    //         case Direction.left:
    //             this.tiles[ingress.x - 1][ingress.y].isSolid = false
    //             this.tiles[ingress.x - 1][ingress.y].fillColor = "#aaffaa"
    //             this.tiles[ingress.x - 2][ingress.y].isSolid = false
    //             this.tiles[ingress.x - 2][ingress.y].fillColor = "#aaffaa"
    //             break;
    //         default:
    //             break;
    //     }
    // }
    
     getPossibleRooms(room: Room){
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
                    this.getOppositeDirection(portal.direction))
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

export default Level
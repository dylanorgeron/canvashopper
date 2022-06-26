import { settings } from '../index'
import Room from "../map-generation/room";
import Mob from "./mob";

export default class Director{
    public mobs: Mob[] = []

    public populateRoom(room: Room, i: number){
        for(let mobCount = 0; mobCount < i; mobCount++){
            this.mobs.push(
                new Mob(
                    (room.origin.x * settings.tileSize) + 50 + (mobCount * 10),
                    (room.origin.y * settings.tileSize) + 50 + (mobCount * 10)
                )
            )
        }
    }
}
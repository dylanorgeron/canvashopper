import Player from "../backend/src/player";
import { Level } from "./level/level";

export class State{
    public id: string = ''
    public level: Level | null = null
    public players: Player [] = []
}
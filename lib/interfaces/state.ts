import Player from "../../backend/src/player";
import { Level } from "../level/level";

export interface IState{
    id: string
    level: Level
    players: Player[],
}
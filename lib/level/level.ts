import { IGeometryObject } from "../interfaces/geometery-object";
import { v4 } from "uuid";

export class Level {
    public geometryObjects: IGeometryObject[] = []
    constructor(
        public width: number = 0,
        public height: number = 0
    ) {

    }
    public addGeometryObject(x: number, y: number, w: number, h: number, color: string) {
        this.geometryObjects.push(
            { id: v4(), x, y, w, h, color }
        )
    }
}
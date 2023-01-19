import { IGeometryObject } from "./geometery-object";

export class Level {
    public geometryObjects: IGeometryObject[] = []
    constructor(
        public width: number = 0,
        public height: number = 0
    ) {

    }
    public addGeometryObject(x: number, y: number, w: number, h: number, color: string) {
        this.geometryObjects.push(
            { x, y, w, h, color }
        )
    }
}
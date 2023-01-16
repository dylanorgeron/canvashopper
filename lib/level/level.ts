import { GeometryObject } from "./geometery-object";

export class Level {
    public geometryObjects: GeometryObject[] = []
    constructor(
        public width: number = 0,
        public height: number = 0
    ){
        
    }
    public addGeometryObject(x: number, y: number, w: number, h:number)
    {
        this.geometryObjects.push(
            new GeometryObject(x, y, w, h)
        )       
    }
}
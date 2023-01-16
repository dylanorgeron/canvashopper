import Coordinate from "./map-generation/coordinate"

class Settings {
    public tileSize = 10
    public drawTextures = false
    public playerStart = new Coordinate(10,10)
    public levelRoomCount = 5

    zoom(event: WheelEvent){
        event.preventDefault()
        if(event.deltaY > 0){
            this.tileSize += -2
        }
        else{
            this.tileSize += 2
        }
    }
}

export default Settings
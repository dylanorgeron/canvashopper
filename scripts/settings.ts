class Settings {
    public tileSize = 15
    public drawTextures = false

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
class Settings {
    public tileSize = 25

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
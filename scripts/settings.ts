class Settings {
    public tileSize = 25

    zoom(event: WheelEvent){
        event.preventDefault
        console.log(event.deltaY)
        if(event.deltaY > 0){
            this.tileSize += -2
        }
        else{
            this.tileSize += 2
        }
        console.log(this.tileSize)
    }
}

export default Settings
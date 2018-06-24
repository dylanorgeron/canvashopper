import {emitter} from './index'
import Popup from './popup'

const tileSize = 25

class PopupLogicController{
    public popups:Popup[] = []
    constructor(){
        emitter.on('update', this.update.bind(this))
    }

    update(){
        this.popups.forEach((p, index) => {
            if(p.duration === 0){
                this.popups.splice(index,1)
            }else{
                p.update()
            }
        })
    }

    addPopup(text: string, x: number, y: number){
        this.popups.push(new Popup(text, x, y))
    }
}

export default PopupLogicController
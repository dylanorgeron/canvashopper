import {emitter, player1, level} from './index'
import Enemy from './enemy'

class EnemyLogicController{
    public enemies:Enemy[] = []
    constructor(){
        emitter.on('update', this.update.bind(this))
    }

    update(){
        if(this.enemies.length == 0){
            this.spawnEnemy()
        }        
    }

    spawnEnemy(){
        let spawnPosition =  Math.floor(Math.random() * 11) > 5 ? player1.x + 800 : player1.x - 800
        if(spawnPosition < 0){
            spawnPosition = player1.x + 800
        }
        if(spawnPosition > level.width * level.tileWidth){
            spawnPosition = player1.x - 800
        }
        this.enemies.push(new Enemy(spawnPosition, player1.y))
    }
}

export default EnemyLogicController
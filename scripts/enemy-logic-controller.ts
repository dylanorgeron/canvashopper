import {emitter, player1, level} from './index'
import Enemy from './enemy'

const tileSize = 25

class EnemyLogicController{
    public enemies:Enemy[] = []
    public cooldown = 0
    public spawnDelay = 60
    constructor(){
        emitter.on('update', this.update.bind(this))
    }

    update(){
        if(this.cooldown > 0) this.cooldown--
        if(this.enemies.length < 1 && this.cooldown == 0){
            this.spawnEnemy()
        } 
    }

    spawnEnemy(){
        this.cooldown = this.spawnDelay
        let spawnPosition =  Math.floor(Math.random() * 11) > 5 ? player1.x + 800 : player1.x - 800
        if(spawnPosition < 0){
            spawnPosition = player1.x + 800
        }
        if(spawnPosition > level.width * tileSize){
            spawnPosition = player1.x - 800
        }
        this.enemies.push(new Enemy(spawnPosition, player1.y))
    }
}

export default EnemyLogicController
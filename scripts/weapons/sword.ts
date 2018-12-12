import Weapon from './weapon'

class Sword extends Weapon{
    constructor() {
        super(
        //isActive
        false,
        //display name
        'Basic Sword',
        //group name
        'sword',
        //damage
        25,
        //hitbox width
        30,
        //hitbox height
        10,
        //hitbox duration in ms
        30,
        //relative to player
        true
        )
    }

    attack(){
        console.log('attacking with sword')
    }
}

export default Sword
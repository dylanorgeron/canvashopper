import Weapon from './weapon'

class Sword extends Weapon{
    constructor() {
        super(
        //isActive
        false,
        //display name
        'Basic Bow',
        //group name
        'bow',
        //damage
        30,
        //hitbox width
        10,
        //hitbox height
        30,
        //hitbox duration in ms
        30,
        //relative to player
        true
        )
    }

    attack(){
        console.log('attacking with bow')
    }
}

export default Sword
class Weapon{
    constructor(
    public isActive: boolean,
    public name: string,
    public type: string,
    public damage: number,
    public hitboxWidth: number,
    public hitboxHeight: number,
    public hitDuration: number,
    //projectiles are not (always) relative to the player
    //melee weapons are (usually) relative to player
    public relativeToPlayer: boolean
    ){}

    attack(){
        
    }
}

export default Weapon
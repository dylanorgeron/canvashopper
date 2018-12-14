import Player from "../player";

class Weapon{
    constructor(
    public player: Player,
    public isActive: boolean,
    public name: string,
    public type: string,
    public damage: number,
    public attackDuration: number,
    public cooldown: number,
    public hitboxWidth: number,
    public hitboxHeight: number,
    public hitDuration: number,
    //projectiles are not (always) relative to the player
    //melee weapons are (usually) relative to player
    public relativeToPlayer: boolean
    ){}

    use(evt: MouseEvent){
        
    }
}

export default Weapon
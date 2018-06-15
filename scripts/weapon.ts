class Weapon{

    public isActive = false

    constructor(
        public name: string,
        public type: string,
        //time the hitbox is active in frames
        public hitDuration: number,
        public damage: number,
        public hitboxHeight: number,
        public hitboxWidth: number,
    ){

    }
}

export default Weapon
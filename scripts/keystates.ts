class Keystates {
    public readonly LeftArrow = 37;
    public readonly UpArrow = 38;
    public readonly RightArrow = 39;
    public readonly DownArrow = 40;
    public readonly Space = 32;
    public readonly AKey = 65;
    public readonly DKey = 68;

    public LeftArrowIsActive = false;
    public UpArrowIsActive = false;
    public RightArrowIsActive = false;
    public DownArrowIsActive = false;
    public SpaceIsActive = false;

    setKey(keycode:number, state:boolean){
        switch (keycode) {
            case this.LeftArrow:
            case this.AKey:
                this.LeftArrowIsActive = state;
                if(state){
                    this.RightArrowIsActive = false;
                }
                break;
            case this.UpArrow:
                this.UpArrowIsActive = state;
                break;
            case this.RightArrow:
            case this.DKey:
                this.RightArrowIsActive = state;
                if(state){
                    this.LeftArrowIsActive = false;
                }
                break;
            case this.DownArrow:
                this.DownArrowIsActive = state;
                break;
            case this.Space:
                this.SpaceIsActive = state;
                break;
        }
    }
}

export default Keystates

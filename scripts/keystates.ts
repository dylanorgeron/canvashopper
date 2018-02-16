class Keystates {
    public readonly LeftArrow = 37;
    public readonly UpArrow = 38;
    public readonly RightArrow = 39;
    public readonly DownArrow = 40;
    public readonly Space = 32;

    public LeftArrowIsActive = false;
    public UpArrowIsActive = false;
    public RightArrowIsActive = false;
    public DownArrowIsActive = false;
    public SpaceIsActive = false;

    setKey(keycode:number, state:boolean){
        switch (keycode) {
            case this.LeftArrow:
                this.LeftArrowIsActive = state;
                break;
            case this.UpArrow:
                this.UpArrowIsActive = state;
                break;
            case this.RightArrow:
                this.RightArrowIsActive = state;
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

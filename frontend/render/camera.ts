import GameInstance from "./game-instance"

class Camera {
  public originX: number = 0
  public originY: number = 0
  constructor(public gameInstance: GameInstance) {
    this.gameInstance.emitter.on('renderObjects', () => { })
  }
}
export default Camera
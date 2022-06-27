
class Canvas{
    public readonly canvasElement = document.getElementById('main-canvas') as HTMLCanvasElement
    public readonly canvasCTX = this.canvasElement.getContext('2d') as CanvasRenderingContext2D
    public readonly height = this.canvasElement.height
    public readonly width = this.canvasElement.width
}

export default Canvas
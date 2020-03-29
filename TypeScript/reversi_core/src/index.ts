import Board, { Token, Square } from './board'
import pet from './img/pets-24px.svg'
import star from './img/stars-24px.svg'

type imgset = {
    name: string,
    url: string
}
export class Resources {
    private imgs: Map<string, HTMLImageElement> = new Map()
    private loadingItems: Promise<boolean>[] = []
    private loadingPromise = (imgItem: imgset): Promise<boolean> => {
        return new Promise(resolve => {
            const imageElem = new Image()
            imageElem.src = imgItem.url
            imageElem.onload = () => {
                this.imgs.set(imgItem.name, imageElem)
                console.log(`resolved: ${imgItem.name, imgItem.url}`)
                resolve(true)
            }
        })
    }
    public loadImage = async (imgset: imgset[]) => {
        for (let item of imgset) {
            this.loadingItems.push(this.loadingPromise(item))
        }
        await Promise.all(this.loadingItems)
    }
    public getimg = (name: string) => this.imgs.get(name)
}
const elemBoundPosition = (elem: HTMLElement): any & DOMRect => {
    let bound: any & DOMRect = elem.getBoundingClientRect()
    // create position property
    bound['posi'] = {
        lt: { x: bound.left, y: bound.top },
        lb: { x: bound.left, y: bound.bottom },
        rt: { x: bound.right, y: bound.top },
        rb: { x: bound.right, y: bound.bottom },
    }
    return bound
}
const drawLine = (ctx: CanvasRenderingContext2D, row: number, col: number): void => {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < col; j++) {
            ctx.strokeRect(squareSize * i, squareSize * j, squareSize, squareSize)
        }
    }
    return
}
// クリックされた座標を引数にとる
// クリック位置に対応するboard上の位置を col, row として返す
const getClicedSquare = (clicked: { x: number, y: number }): Square => {
    const squareSize: number = elemBoundPosition(canvas).width / 8
    const O: { x: number, y: number } = elemBoundPosition(canvas)
    const relaXYClicked = { x: clicked.x - O.x, y: clicked.y - O.y }
    return {
        row: Math.floor(relaXYClicked.y / squareSize),
        col: Math.floor(relaXYClicked.x / squareSize)
    }
}
// Event handler
const clickBoardHandler = (e: MouseEvent) => {
    const postion = { x: e.pageX, y: e.pageY }
    console.log(getClicedSquare(postion))
}
//
// Create canvas
const root: HTMLElement = document.getElementById('root')
const canvas: HTMLCanvasElement = document.createElement('canvas')
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
const offset = 20
const canW = window.innerWidth - offset
const canH = window.innerHeight - offset
const canSize = canW > canH ? canH : canW
canvas.width = canSize
canvas.height = canSize
root.appendChild(canvas)
// Load Image
const resoucers = new Resources()
const imgsets: imgset[] = [
    { name: 'pet', url: pet },
    { name: 'star', url: star }
]
// Create board
const board = new Board()
const squareSize = canSize / Board.COLUMN
ctx.fillStyle = 'darkgray'
// Draw
drawLine(ctx, Board.COLUMN, Board.ROW);
(async () => {
    await resoucers.loadImage(imgsets)
    const imgs = { white: resoucers.getimg('pet'), black: resoucers.getimg('star') }
    Board.walk((s: Square) => Board.drawToken(ctx, board.board, imgs, squareSize, s))
})()
//
canvas.addEventListener('click', clickBoardHandler)
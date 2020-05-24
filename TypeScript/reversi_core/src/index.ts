import Board, { Token, Square } from './board'
import pet from './img/pets-24px.svg'
import star from './img/stars-24px.svg'

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
// クリックされた座標を引数にとる
// クリック位置に対応するboard上の位置を col, row として返す
const getClickedSquare = (clicked: { x: number, y: number }): Square => {
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
    const position = { x: e.pageX, y: e.pageY }
    const clickedSquare = getClickedSquare(position)
    if (Board.canPut(clickedSquare, board.state.enablePutSquares)) {
        board.updatePutSquare(clickedSquare)
        board.updateReverseSquares(clickedSquare)
        board.afterPut()
    }
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
const imgsets: { name: string, url: string }[] = [
    { name: 'pet', url: pet },
    { name: 'star', url: star }
]
// Create board
const board = new Board(
    ctx,
    canSize,
    imgsets
);
//
canvas.addEventListener('click', clickBoardHandler)
import BOARD, { Token, Square } from './board'
import pet from './img/pets-24px.svg'
import star from './img/stars-24px.svg'

const getWinW = () => window.innerWidth
const getWinH = () => window.innerHeight

const root: HTMLElement = document.getElementById('root')
const canvas: HTMLCanvasElement = document.createElement('canvas')
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

const imgPet = new Image()
imgPet.src = pet
imgPet.width = imgPet.height = 100
const imgStar = new Image()
imgStar.src = star
imgStar.width = imgStar.height = 100

const initCanvas = () => {
    root.appendChild(canvas)
    const b = new BOARD()
    const drawCanvas = () => {
        const offset = 20
        const canW = getWinW() - offset
        const canH = getWinH() - offset
        const canSize = canW > canH ? canH : canW
        canvas.width = canSize
        canvas.height = canSize
        const squareSize = canSize / BOARD.COLUMN

        ctx.fillStyle = 'darkgray'
        for (let i = 0; i < BOARD.COLUMN; i++) {
            for (let j = 0; j < BOARD.ROW; j++) {
                ctx.strokeRect(squareSize * i, squareSize * j, squareSize, squareSize)
            }
        }
        // b.state.board をcanvas に反映する
        // 配列を座標に置き換える
        const drawToken = () => {
            const board = b.state.board
            imgPet.onload = () => {
                b.walk((s: Square) => {
                    if (b.getSquare(s) === Token.WHITE) {
                        // ctx.fillRect(squareSize * s.col, squareSize * s.row, squareSize, squareSize)
                        ctx.drawImage(imgPet, squareSize * s.col, squareSize * s.row, squareSize, squareSize)
                    }
                    if (b.getSquare(s) === Token.BLACK) {
                        ctx.drawImage(imgStar, squareSize * s.col, squareSize * s.row, squareSize, squareSize)
                    }
                })
            }
        }
        drawToken()
    }
    drawCanvas()
}

initCanvas()

const elemBoundPosition = (elem: HTMLElement): any & DOMRect => {
    let bound: any & DOMRect = elem.getBoundingClientRect()
    bound['posi'] = {
        lt: { x: bound.left, y: bound.top },
        lb: { x: bound.left, y: bound.bottom },
        rt: { x: bound.right, y: bound.top },
        rb: { x: bound.right, y: bound.bottom },
    }
    return bound
}
console.log(elemBoundPosition(canvas))


// クリックされた座標を引数にとる
// クリック位置に対応するboard上の位置を col, row として返す
const applyXYtoBoardMap = (posi: {x: number, y: number}): { row: number, col: number } => {
    
    const squareSize: number = elemBoundPosition(canvas).width / 8
    const lt: {x: number, y: number} = elemBoundPosition(canvas)
    const relaXYClicked = {x: posi.x - lt.x, y: posi.y - lt.y}
    const row = relaXYClicked.y / squareSize
    const col = relaXYClicked.x / squareSize
    return { row: Math.floor(row), col: Math.floor(col) }
}

const clickBoard = (canvas: HTMLCanvasElement): void => {
    canvas.addEventListener(
        'click',
        (e: MouseEvent) => {
            const posi = {x: e.pageX, y: e.pageY}
            console.log(applyXYtoBoardMap(posi))
        })
}
clickBoard(canvas)


import { Resources } from './index'
// Utility Function
const funcTimes = (func: Function) => (n: number) => () => {
    for (let i = 0; i < n; i++) func()
}
//
export enum Token {
    WHITE = 1,
    BLACK = 0,
    BLANK = -1
}
export type Square = {
    row: number,
    col: number
}
type SquareFunc = (square: Square) => void
export type DIRECTION = {
    x: 1 | -1 | 0,
    y: 1 | -1 | 0
}
const DIRECTIONS: DIRECTION[] = [
    { x: 0, y: 1 }, { x: 0, y: -1 },
    { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: -1 },
    { x: -1, y: 0 }, { x: -1, y: 1 }, { x: -1, y: -1 }
]
type State = {
    enablePutSquares: Square[],
    reverseToken: Square[],
    player: Token.WHITE | Token.BLACK,
    oldPlayer: Token.WHITE | Token.BLACK,
}
type BoardState = number[][]
type scanedLineData = {
    pattern: string,
    arr: Square[]
}
const getEnemy = (player: Token) => player === Token.WHITE ? Token.BLACK : Token.WHITE
export const createSquare = (r: number, c: number): Square => ({ row: r, col: c })

class Board {
    static readonly ROW = 8
    static readonly COLUMN = 8
    // Square, Token
    static getToken = (board: BoardState, s: Square): Token => board[s.row][s.col]
    static putSquare = (board: BoardState) => (s: Square) => (player: Token): BoardState => {
        board[s.row][s.col] = player
        return board
    }
    static putToken = (board: BoardState) => (s: Square) => (token: Token): BoardState => {
        Board.putSquare(board)(s)(token)
        return board
    }
    static putWhite = (board: BoardState) => (s: Square): BoardState => Board.putToken(board)(s)(Token.WHITE)
    static putBlack = (board: BoardState) => (s: Square): BoardState => Board.putToken(board)(s)(Token.BLACK)
    static reverseToken = (board: BoardState) => (s: Square): BoardState => {
        let square = Board.getToken(board, s)
        if (square === Token.BLACK) Board.putWhite(board)(s)
        if (square === Token.WHITE) Board.putBlack(board)(s)
        return board
    }
    static walk = (func: SquareFunc) => {
        for (let row = 0; row < Board.ROW; row++) {
            for (let col = 0; col < Board.COLUMN; col++) {
                func({ row, col })
            }
        }
    }
    static generateNewBoard = (): BoardState => {
        let board: BoardState = []
        const row: number[] = new Array(Board.COLUMN).fill(Token.BLANK)
        const pushRow = () => board.push(row.slice(0))
        funcTimes(pushRow)(Board.ROW)()
        Board.putWhite(board)({ row: 3, col: 3 })
        Board.putWhite(board)({ row: 4, col: 4 })
        Board.putBlack(board)({ row: 3, col: 4 })
        Board.putBlack(board)({ row: 4, col: 3 })
        return board
    }
    static notPutToken = (board: BoardState) => (s: Square) => board[s.row] === undefined || Board.getToken(board, s) === undefined
    static convertTokenToStrings = (t: Token) => t === Token.BLANK ? 'B' : t
    // Check board status
    static scanLinePattern = (board: BoardState) => (d: DIRECTION) => (center: Square): scanedLineData => {
        let scanedData: scanedLineData = { pattern: '', arr: [] }
        for (let n = 1; ; n++) {
            const currentSquare: Square = {
                row: center.row + d.y * n,
                col: center.col + d.x * n
            }
            if (Board.notPutToken(board)(currentSquare)) break
            scanedData.pattern += Board.convertTokenToStrings(Board.getToken(board, currentSquare))
            scanedData.arr.push(currentSquare)
        }
        return scanedData
    }
    static canPut = (board: BoardState) => (player: Token, s: Square): boolean => {
        const enemy = getEnemy(player)
        if (board[s.row][s.col] !== Token.BLANK) return false //  Blankでないマスは配置不可
        for (let i in DIRECTIONS) {
            const line: scanedLineData = Board.scanLinePattern(board)(DIRECTIONS[i])(s)
            const regExStr = new RegExp('^' + enemy + '+' + player)
            if (line.pattern.match(regExStr)) return true
        }
    }
    static canPutSquares = (board: BoardState) => (player: Token): Square[] => {
        const enableSquares: Square[] = []
        Board.walk((s: Square) => {
            if (Board.canPut(board)(player, s)) enableSquares.push(s)
        })
        return enableSquares
    }
    // Draw
    static drawToken = (
        ctx: CanvasRenderingContext2D,
        board: BoardState,
        imgs: {
            white: HTMLImageElement,
            black: HTMLImageElement
        },
        squareSize: number,
        target: Square
    ) => {
        const image = Board.getImage(board, target, imgs)
        if (image) ctx.drawImage(image, squareSize * target.col, squareSize * target.row, squareSize, squareSize)
    }
    static getImage = (board: BoardState, target: Square, imgs: { white: HTMLImageElement, black: HTMLImageElement }) => {
        if (Board.getToken(board, target) === Token.WHITE) return imgs.white
        if (Board.getToken(board, target) === Token.BLACK) return imgs.black
    }
    // Game
    static changePlayer = (state: State) => {
        state.oldPlayer = state.player
        state.player = getEnemy(state.oldPlayer)
    }
    // about String.match method:
    //   https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match
    static execReverse = (board: BoardState) => (s: Square, player: Token): Square[] => {
        let reverseSquares: Square[] = []
        const enemy = getEnemy(player)
        const canPutPattern = new RegExp('^(' + enemy + '+)' + player)
        for (let i in DIRECTIONS) {
            const scanedLine = Board.scanLinePattern(board)(DIRECTIONS[i])(s) //  列におけるTokenの並びを取得
            const found = scanedLine.pattern.match(canPutPattern)
            if (found === null) continue
            //
            const enemyLength = found[1].length
            for (let j = 0; j < enemyLength; j++) {
                const currentS: Square = scanedLine.arr[j]
                Board.putSquare(board)(currentS)(player) //  board 書き換え
                reverseSquares.push(currentS) //  書き換えた場所を保持
            }
        }
        // 裏返った位置を返す
        return reverseSquares
    }
    //
    //
    public board: BoardState = []
    public state: State = {
        enablePutSquares: [],
        reverseToken: [],
        player: Token.WHITE,
        oldPlayer: Token.BLACK,
    }
    //
    constructor() {
        this.resetBoard()
        this.state.enablePutSquares = Board.canPutSquares(this.board)(Token.WHITE)
    }
    public resetBoard = () => this.board = Board.generateNewBoard()
    public processPutToken = (s: Square): boolean => {
        for (let i in this.state.enablePutSquares) {
            const square: Square = this.state.enablePutSquares[i]
            const canPut = square.row === s.row && square.col === s.col
            if (canPut) {
                Board.putSquare(this.board)(s)(this.state.player)
                this.state.reverseToken = Board.execReverse(this.board)(s, this.state.player)
                Board.changePlayer(this.state)
                return true
            }
        }
        return false
    }
}

export default Board
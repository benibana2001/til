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
    board: BoardState,
    enablePutSquares: Square[],
    put: Square | null,
    reverseToken: Square[],
    player: Token.WHITE | Token.BLACK,
    oldPlayer: Token.WHITE | Token.BLACK,
}
type BoardState = number[][]
type scanedLineData = {
    pattern: string,
    arr: Square[]
}
const initialState: State = {
    board: [],
    enablePutSquares: [],
    put: null,
    reverseToken: [],
    player: Token.WHITE,
    oldPlayer: Token.BLACK,
}
const getEnemy = (player: Token) => player === Token.WHITE ? Token.BLACK : Token.WHITE
export const createSquare = (r: number, c: number): Square => ({ row: r, col: c })
const walk = (func: SquareFunc) => {
    for (let row = 0; row < BOARD.ROW; row++) {
        for (let col = 0; col < BOARD.COLUMN; col++) {
            func({ row, col })
        }
    }
}
class BOARD {
    static readonly ROW = 8
    static readonly COLUMN = 8
    public state: State = initialState
    public getSquare = (s: Square): Token => this.state.board[s.row][s.col]
    public putSquare = (s: Square) => (player: Token): BoardState => {
        this.state.board[s.row][s.col] = player
        return this.state.board
    }
    public putWhite = (s: Square): BoardState => {
        this.putSquare(s)(Token.WHITE)
        return this.state.board
    }
    public putBlack = (s: Square): BoardState => {
        this.putSquare(s)(Token.BLACK)
        return this.state.board
    }
    public reverseToken = (s: Square): BoardState => {
        let square = this.getSquare(s)
        if (square === Token.BLACK) this.putWhite(s)
        if (square === Token.WHITE) this.putBlack(s)
        return this.state.board
    }

    public initBoard = (): State => {
        this.state.board = []
        const row: number[] = new Array(BOARD.COLUMN).fill(Token.BLANK)
        const pushRow = () => this.state.board.push(row.slice(0))
        funcTimes(pushRow)(BOARD.ROW)()
        this.putWhite({ row: 3, col: 3 })
        this.putWhite({ row: 4, col: 4 })
        this.putBlack({ row: 3, col: 4 })
        this.putBlack({ row: 4, col: 3 })
        return this.state
    }

    constructor() {
        this.initBoard()
        this.state.enablePutSquares = this.canPutSquares(Token.WHITE)
    }

    // this.board をcanvas に反映する
    public drawTokenFromBoardState = (ctx: CanvasRenderingContext2D, r: Resources, squareSize: number) => {
        walk((s: Square) => {
            const image = (() => {
                if (this.getSquare(s) === Token.WHITE) return r.getimg('pet')
                if (this.getSquare(s) === Token.BLACK) return r.getimg('star')
            })()
            if (image) ctx.drawImage(image, squareSize * s.col, squareSize * s.row, squareSize, squareSize)
        })
    }

    private notPutToken = (s: Square) => this.state.board[s.row] === undefined || this.getSquare(s) === undefined
    private convertTokenToStrings = (t: Token) => t === Token.BLANK ? 'B' : t
    // dx, dy: 単位ベクトル

    public scanLine = (d: DIRECTION) => (center: Square): scanedLineData => {
        let scanedData: scanedLineData = { pattern: '', arr: [] }
        for (let n = 1; ; n++) {
            const checkedSquare: Square = {
                row: center.row + d.y * n,
                col: center.col + d.x * n
            }
            if (this.notPutToken(checkedSquare)) break
            scanedData.pattern += this.convertTokenToStrings(this.getSquare(checkedSquare))
            scanedData.arr.push(checkedSquare)
        }
        return scanedData
    }

    private canPut = (player: Token, s: Square): boolean => {
        const enemy = getEnemy(player)
        if (this.state.board[s.row][s.col] !== Token.BLANK) return false //  Blankでないマスは配置不可
        for (let i in DIRECTIONS) {
            const line: scanedLineData = this.scanLine(DIRECTIONS[i])(s)
            const regExStr = new RegExp('^' + enemy + '+' + player)
            if (line.pattern.match(regExStr)) return true
        }
    }

    public canPutSquares = (player: Token): Square[] => {
        const enableSquares: Square[] = []
        walk((s: Square) => {
            if (this.canPut(player, s)) enableSquares.push(s)
        })
        return enableSquares
    }
    // 手番を変更
    private changePlayer = () => {
        this.state.oldPlayer = this.state.player
        this.state.player = getEnemy(this.state.oldPlayer)
    }
    public putToken = (s: Square): boolean => {
        for (let i = 0; i < this.state.enablePutSquares.length; i++) {
            const square: Square = this.state.enablePutSquares[i]
            if (square.row === s.row && square.col === s.col) {
                this.state.put = s
                // reverse process
                this.execReverse(s, this.state.player)
                this.changePlayer()
                return true
            }
        }
        return false
    }

    // 石を置いたのちのアクション
    public execReverse = (s: Square, player: Token): Square[] => {
        let reversedS: Square[] = []
        const enemy = getEnemy(player)
        for (let i = 0; i < DIRECTIONS.length; i++) {
            const line = this.scanLine(DIRECTIONS[i])(s) //  裏返る石のパターン作成
            const regExStr = new RegExp('^(' + enemy + '+)' + player)
            const found = line.pattern.match(regExStr)
            // To ref about String.match method: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match
            if (found === null) continue
            for (let j = 0; j < found[1].length; j++) {
                const currentS: Square = line.arr[j]
                this.putSquare(currentS)(player) //  board 書き換え
                reversedS.push(currentS) //  書き換えた場所を保持
            }
        }
        this.putSquare(s)(player)
        this.state.reverseToken = reversedS
        return this.state.reverseToken
    }
}

export default BOARD
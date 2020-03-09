// Utility Function
const funcTimes = (func: Function) => (n: number) => () => {
    for (let i = 0; i < n; i++) func()
}
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
const initialState: State = {
    board: [],
    enablePutSquares: [],
    put: null,
    reverseToken: [],
    player: Token.WHITE,
    oldPlayer: Token.BLACK,
}
class BOARD {
    static readonly ROW = 8
    static readonly COLUMN = 8
    static getEnemy = (player: Token) => player === Token.WHITE ? Token.BLACK : Token.WHITE
    static createSquare = (r: number, c: number): Square => ({ row: r, col: c })
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
        this.state.enablePutSquares = this.getEnablePutSquares(Token.WHITE)
    }

    public walk = (func: SquareFunc) => {
        for (let row = 0; row < BOARD.ROW; row++) {
            for (let col = 0; col < BOARD.COLUMN; col++) {
                func({ row, col })
            }
        }
    }

    // dx, dy: 単位ベクトル
    public scanLine = (d: DIRECTION) => (s: Square): { pattern: string, arr: Square[] } => {
        let pattern: string = ''
        let arr: Square[] = []
        for (let m = 1; ; m++) {
            const newSquare: Square = {
                row: s.row + d.y * m,
                col: s.col + d.x * m 
            }
            if (this.state.board[newSquare.row] === undefined || this.getSquare(newSquare) === undefined) break
            switch (this.getSquare(newSquare)) {
                case Token.BLANK:
                    pattern += 'B'
                    break
                default:
                    pattern += this.getSquare(newSquare)
            }
            arr.push(newSquare)
        }
        return {
            pattern: pattern,
            arr: arr
        }
    }

    public getEnablePutSquares = (player: Token): Square[] => {
        const res: Square[] = []
        const enemy: number = BOARD.getEnemy(player)
        const getEnableSquares: SquareFunc = (s: Square) => {
            if (this.state.board[s.row][s.col] !== Token.BLANK) return //  Blankでないマスは配置不可
            for (let j = 0; j < DIRECTIONS.length; j++) {
                const line = this.scanLine(DIRECTIONS[j])(s)
                const regExStr = new RegExp('^' + enemy + '+' + player)
                if (line.pattern.match(regExStr)) {
                    res.push(s)
                }
            }
        }
        this.walk(getEnableSquares)
        return res
    }

    public putToken = (s: Square): boolean => {
        for (let i = 0; i < this.state.enablePutSquares.length; i++) {
            const square: Square = this.state.enablePutSquares[i]
            if (square.row === s.row && square.col === s.col) {
                this.state.put = s
                // reverse process
                this.execReverse(s, this.state.player)
                this.next()
                return true
            }
        }
        return false
    }
    // 石を置いたのちのアクション
    public execReverse = (s: Square, player: Token): Square[] => {
        let reversed: Square[] = []
        const enemy = BOARD.getEnemy(player)
        for (let i = 0; i < DIRECTIONS.length; i++) {
            const line = this.scanLine(DIRECTIONS[i])(s) //  裏返る石のパターン作成
            const regExStr = new RegExp('^(' + enemy + '+)' + player)
            const found = line.pattern.match(regExStr)
            // To ref about String.match method: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match
            if (found === null) continue
            for (let j = 0; j < found[1].length; j++) {
                const currentS: Square = line.arr[j]
                this.putSquare(currentS)(player) //  board 書き換え
                reversed.push(currentS) //  書き換えた場所を保持
            }
        }
        this.putSquare(s)(player)
        this.state.reverseToken = reversed
        return this.state.reverseToken 
    }
    // 手番を変更
    private next = () => {
        this.state.oldPlayer = this.state.player
        this.state.player = BOARD.getEnemy(this.state.oldPlayer)
    }
}

export default BOARD
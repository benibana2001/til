// Utility Function
const funcTimes = (func: Function) => (n: number) => () => {
    for (let i = 0; i < n; i++) func()
}
interface IBoard {
    putWhite: Function
    putBlack: Function
}
export enum Token {
    WHITE = 1,
    BLACK = -1,
    BLANK = 0
}
type State = {
    board: BoardState,
    enablePutSquares: Square[],
    put: Square | null,
    reverseToken: Square[],
    player: Token.WHITE | Token.BLACK
}
type BoardState = number[][]
const initialState: State = {
    board: [],
    enablePutSquares: [],
    put: null,
    reverseToken: [],
    player: Token.WHITE
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


class BOARD implements IBoard {
    private readonly ROW = 8
    private readonly COLUMN = 8
    public state: State = initialState

    private getRow = (ary: number[][]) => (n: number) => ary[n]
    private getColumn = (ary: BoardState) => (n: number) => {
        let newAry: number[] = []
        ary.forEach((elem) => newAry.push(elem[n]))
        return newAry
    }

    static setSquare = (ary: BoardState) => (n: number) => (r: number) => (c: number) => ary[r][c] = n

    public putWhite = (row: number, column: number): BoardState => {
        BOARD.setSquare(this.state.board)(Token.WHITE)(row)(column)
        return this.state.board
    }
    public putBlack = (row: number, column: number): BoardState => {
        BOARD.setSquare(this.state.board)(Token.BLACK)(row)(column)
        return this.state.board
    }
    public reverseToken = (row: number, column: number): BoardState => {
        let square = this.state.board[row][column]
        if (square === Token.BLACK) this.putWhite(row, column)
        if (square === Token.WHITE) this.putBlack(row, column)
        return this.state.board
    }

    private abs = (n: number) => n < 0 ? - n : n

    public initState = (): State => {
        this.state.board = []
        const row: number[] = new Array(this.COLUMN).fill(Token.BLANK)
        const pushRow = () => this.state.board.push(row.slice(0))
        funcTimes(pushRow)(this.ROW)()
        this.putWhite(3, 3)
        this.putWhite(4, 4)
        this.putBlack(3, 4)
        this.putBlack(4, 3)
        this.state.enablePutSquares = this.getEnablePutSquares(Token.WHITE)
        return this.state
    }

    constructor() {
        this.initState()
    }

    public walk = (func: SquareFunc) => {
        for (let row = 0; row < this.ROW; row++) {
            for (let col = 0; col < this.COLUMN; col++) {
                func({ row, col })
            }
        }
    }

    // dx, dy: 単位ベクトル
    // public scanLine = (d: DIRECTION) => (x: number, y: number): string => {
    public scanLine = (d: DIRECTION) => (s: Square): { pattern: string, arr: Square[] } => {
        let pattern: string = ''
        let arr: Square[] = []
        for (let m = 1; ; m++) {
            const currentCol = s.col + d.x * m
            const currentRow = s.row + d.y * m
            if (this.state.board[currentRow] === undefined || this.state.board[currentRow][currentCol] === undefined) break
            const squareVal = this.state.board[currentRow][currentCol]
            switch (squareVal) {
                case Token.BLANK:
                    pattern += 'B'
                    break
                default:
                    pattern += squareVal
            }
            arr.push({ row: currentRow, col: currentCol })
        }
        const line = {
            pattern: pattern,
            arr: arr
        }
        return line
    }

    public getEnablePutSquares = (t: Token): Square[] => {
        let res: Square[] = []
        let player: number = t === Token.WHITE ? Token.WHITE : Token.BLACK
        let enemy: number = t === Token.WHITE ? Token.BLACK : Token.WHITE
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
                return true
            }
        }
        return false
    }
    private execReverse = (s: Square, player: Token): void => {
        const enemy = player === Token.WHITE ? Token.BLACK : Token.WHITE
        for (let i = 0; i < DIRECTIONS.length; i++) {
            const line = this.scanLine(DIRECTIONS[i])(s)
            const regExStr = new RegExp('^(' + enemy + '+)' + player)
            const found = line.pattern.match(regExStr)
            // To ref about String.match method: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match
            for (let j = 0; j < found[1].length; j++) {
                const currentS:Square = line.arr[j]
                this.state.board[currentS.row][currentS.col] = player
                this.state.reverseToken.push(currentS)
            }
        }
        this.state.board[s.row][s.col] = player
    }
}

export default BOARD
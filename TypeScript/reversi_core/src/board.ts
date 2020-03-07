// Utility Function
const funcTimes = (func: Function) => (n: number) => () => {
    for (let i = 0; i < n; i++) func()
}
interface IBoard {
    putWhite: Function
    putBlack: Function
}

type State = number[][]
type Square = {
    row: number,
    col: number
}
type SquareFunc = (square: Square) => void
enum Token {
    WHITE = 1,
    BLACK = -1,
    BLANK = 0
}

class BOARD implements IBoard {
    private readonly ROW = 8
    private readonly COLUMN = 8
    public state: State = []

    private getRow = (ary: number[][]) => (n: number) => ary[n]
    private getColumn = (ary: State) => (n: number) => {
        let newAry: number[] = []
        ary.forEach((elem) => newAry.push(elem[n]))
        return newAry
    }

    static setSquare = (ary: State) => (n: number) => (r: number) => (c: number) => ary[r][c] = n

    public putWhite = (row: number, column: number): State => {
        BOARD.setSquare(this.state)(Token.WHITE)(row)(column)
        return this.state
    }
    public putBlack = (row: number, column: number): State => {
        BOARD.setSquare(this.state)(Token.BLACK)(row)(column)
        return this.state
    }
    public reverseToken = (row: number, column: number): State => {
        let square = this.state[row][column]
        if (square === Token.BLACK) this.putWhite(row, column)
        if (square === Token.WHITE) this.putBlack(row, column)
        return this.state
    }

    private abs = (n: number) => n < 0 ? - n : n

    public initState = (): State => {
        this.state = []
        const row: number[] = new Array(this.COLUMN).fill(Token.BLANK)
        const pushRow = () => this.state.push(row.slice(0))
        funcTimes(pushRow)(this.ROW)()
        this.putWhite(3, 3)
        this.putWhite(4, 4)
        this.putBlack(3, 4)
        this.putBlack(4, 3)
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
}

export default BOARD
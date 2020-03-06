// Utility Function
const funcTimes = (func: Function) => (n: number) => () => {
    for (let i = 0; i < n; i++) func()
}
interface IBoard {
    putWhite: Function
    putBlack: Function
}

type Square = {
    row: number,
    col: number
}

enum Token {
    WHITE = 1,
    BLACK = -1,
    BLANK = 0
}

type SquareFunc = (square: Square) => void

class BOARD implements IBoard {
    private readonly ROW = 8
    private readonly COLUMN = 8
    public state: number[][] = []

    public getRow = (ary: number[][]) => (n: number) => ary[n]
    public getColumn = (ary: number[][]) => (n: number) => {
        let newAry: number[] = []
        ary.forEach((elem) => newAry.push(elem[n]))
        return newAry
    }

    // public getSquare = (ary: number[][]) => (r: number) => (c: number) => (this.getRow(ary)(r))[c]
    private setSquare = (ary: number[][]) => (n: number) => (r: number) => (c: number) => ary[r][c] = n

    private put = this.setSquare(this.state)
    public putWhite = this.put(Token.WHITE)
    public putBlack = this.put(Token.BLACK)

    private abs = (n: number) => n < 0 ? - n : n
    // private toggleToken = (n: 1 | 0) => this.abs(n - 1)

    constructor() {
        const row: number[] = new Array(this.COLUMN).fill(Token.BLANK)
        const pushRow = () => this.state.push(row.slice(0))
        const init = funcTimes(pushRow)(this.ROW)
        init()
        // Put initial token.
        this.putWhite(3)(3)
        this.putWhite(4)(4)
        this.putBlack(3)(4)
        this.putBlack(4)(3)
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
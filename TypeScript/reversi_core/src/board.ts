// Utility Function
const funcTimes = (func: Function) => (n: number) => () => {
    for (let i = 0; i < n; i++) func()
}

// Migration Array
const getRow = (ary: number[][]) => (n: number) => ary[n]
const getColumn = (ary: number[][]) => (n: number) => {
    let newAry: number[] = []
    ary.forEach((elem) => newAry.push(elem[n]))
    return newAry
}
const getSquare = (ary: number[][]) => (r: number) => (c: number) => (getRow(ary)(r))[c]
// 破壊的
const setSquare = (ary: number[][]) => (n: number) => (r: number) => (c: number) => ary[r][c] = n
const abs = (n: number) => n < 0 ? - n : n
const toggle0and1 = (n: 1 | 0) => abs(n - 1)

// Domain Specific
const ROW = 8
const COLUMN = 8
let board: number[][] = []
const putWhite = setSquare(board)(1)
const putBlack = setSquare(board)(-1)
const initBoard = (ary: any[]) => {
    const push = () => ary.push(new Array(COLUMN).fill(0))
    funcTimes(push)(ROW)()
    // Put Initial Token
    putWhite(3)(3)
    putWhite(4)(4)
    putBlack(3)(4)
    putBlack(4)(3)
}

initBoard(board)
console.log(board)

export { getSquare, getRow, getColumn, abs, toggle0and1, setSquare }
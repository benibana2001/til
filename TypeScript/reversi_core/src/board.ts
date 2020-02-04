const ROW = 8
const COLUMN = 8
const TEST_BOARD = [[0, 0, 0], [1, 1, 1], [2, 2, 2]]
const funcTimes = (func: Function) => {
    return (n: number) => {
        return () => {
            for (let i = 0; i < n; i++) {
                func()
            }
        }
    }
}

const initBoard = (ary: any[]) => {
    const push = () => ary.push(new Array(COLUMN).fill(0))
    funcTimes(push)(ROW)()
}

const getRow = (ary: number[][]) => (n: number) => ary[n]

const getColumn = (ary: number[][]) => (n: number) => {
    let newAry: any[] = []
    ary.forEach((elem) => newAry.push(elem[n]))
    return newAry
}

const getSquare = (ary: number[][]) => (r: number) => (c: number) => (getRow(ary)(r))[c]

let board: any[] = []
initBoard(board)

console.log(TEST_BOARD)
console.log(getRow(TEST_BOARD)(2))
console.log(getColumn(TEST_BOARD)(2))
console.log(getSquare(TEST_BOARD)(0)(0))

export {getSquare, getRow, getColumn}
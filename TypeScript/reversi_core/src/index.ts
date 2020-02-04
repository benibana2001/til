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

const getRow = (ary: any[]) => (n: number) => ary[n]

const getColumn = (ary: any[][]) => (n: number) => {
    let newAry: any[][] = []
    ary.forEach((elem) => newAry.push(elem[n]))
    return newAry
}

let board: any[] = []
initBoard(board)

console.log(board)
console.log(getRow(board)(2))
console.log(getColumn(board)(2))


import BOARD from '../board'
import { DIRECTION, Square, Token } from '../board'

const b = new BOARD()
let t: number = 0

describe('TEST TO BOARD', () => {
    afterEach(() => {
        b.initBoard()
    })
    test('initialize', () => {
        console.log(b.state.board)
        expect(b.state.board).toEqual(
            [
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 1, 0, -1, -1, -1],
                [-1, -1, -1, 0, 1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
            ]
        )
    })
    test('putToken', () => {
        const s00 = BOARD.createSquare(0, 0)
        expect(b.putWhite(s00)).toEqual(
            [
                [1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 1, 0, -1, -1, -1],
                [-1, -1, -1, 0, 1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
            ]
        )
        expect(b.putBlack(s00)).toEqual(
            [
                [0, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 1, 0, -1, -1, -1],
                [-1, -1, -1, 0, 1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
            ]
        )
    })
    test('reverseToken', () => {
        const s00 = BOARD.createSquare(0, 0)
        const s33 = BOARD.createSquare(3, 3)
        expect(b.reverseToken(s00)).toEqual(
            [
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 1, 0, -1, -1, -1],
                [-1, -1, -1, 0, 1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
            ]
        )
        expect(b.reverseToken(s33)).toEqual(
            [
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 0, 0, -1, -1, -1],
                [-1, -1, -1, 0, 1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
            ]
        )
        expect(b.reverseToken(s33)).toEqual(
            [
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, 1, 0, -1, -1, -1],
                [-1, -1, -1, 0, 1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1],
            ]
        )
    })
    test('scanLine', () => {
        const D1: DIRECTION = { x: 1, y: 0 }
        const D2: DIRECTION = { x: 0, y: 1 }
        const D3: DIRECTION = { x: 1, y: 1 }
        const D4: DIRECTION = { x: -1, y: 1 }
        const S1: Square = { row: 0, col: 0 }
        const S2: Square = { row: 3, col: 3 }
        const S3: Square = { row: 3, col: 4 }
        const S4: Square = { row: 3, col: 2 }
        const S5: Square = { row: 2, col: 3 }
        const S6: Square = { row: 4, col: 4 }
        const S7: Square = { row: 0, col: 7 }
        expect(b.scanLine(D1)(S1)).toEqual({
            arr: [{
                row: 0,
                col: 1
            }, {
                row: 0,
                col: 2
            }, {
                row: 0,
                col: 3
            }, {
                row: 0,
                col: 4
            }, {
                row: 0,
                col: 5
            }, {
                row: 0,
                col: 6
            }, {
                row: 0,
                col: 7
            }],
            pattern: 'BBBBBBB'
        })
        expect(b.scanLine(D1)(S2)).toEqual({
            arr: [{
                row: 3,
                col: 4
            }, {
                row: 3,
                col: 5
            }, {
                row: 3,
                col: 6
            }, {
                row: 3,
                col: 7
            }],
            pattern: '0BBB'
        })
        expect(b.scanLine(D1)(S3).pattern).toEqual('BBB')
        expect(b.scanLine(D1)(S4).pattern).toEqual('10BBB')
        expect(b.scanLine(D1)(S5).pattern).toEqual('BBBB')
        expect(b.scanLine(D1)(S6).pattern).toEqual('BBB')
        expect(b.scanLine(D2)(S1).pattern).toEqual('BBBBBBB')
        expect(b.scanLine(D2)(S2).pattern).toEqual('0BBB')
        expect(b.scanLine(D2)(S6).pattern).toEqual('BBB')
        expect(b.scanLine(D3)(S1).pattern).toEqual('BB11BBB')
        expect(b.scanLine(D4)(S7).pattern).toEqual('BB00BBB')
    })
    test('enablePutSquares', () => {
        expect(b.getEnablePutSquares(Token.WHITE)).toEqual([
            { "col": 4, "row": 2 },
            { "col": 5, "row": 3 },
            { "col": 2, "row": 4 },
            { "col": 3, "row": 5 }
        ])
        expect(b.getEnablePutSquares(Token.BLACK)).toEqual([
            { "col": 3, "row": 2 },
            { "col": 2, "row": 3 },
            { "col": 5, "row": 4 },
            { "col": 4, "row": 5 }
        ])
    })
    test('execReverse', () => {
        expect(b.execReverse({ row: 2, col: 4 }, Token.WHITE)).toEqual([
            {
                row: 3,
                col: 4
            }]
        )
        expect(b.execReverse({ row: 4, col: 5 }, Token.BLACK)).toEqual([
            {
                row: 4,
                col: 4
            },
        ]
        )
    })
})
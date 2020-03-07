import BOARD from '../board'
import { DIRECTION, Square, Token } from '../board'

const b = new BOARD()
let t: number = 0

describe('TEST TO BOARD', () => {
    afterEach(() => {
        b.initState()
    })
    test('initialize', () => {
        console.log(b.state.board)
        expect(b.state.board).toEqual(
            [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, -1, 0, 0, 0],
                [0, 0, 0, -1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]
        )
    })
    test('putToken', () => {
        expect(b.putWhite(0, 0)).toEqual(
            [
                [1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, -1, 0, 0, 0],
                [0, 0, 0, -1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]
        )
        expect(b.putBlack(0, 0)).toEqual(
            [
                [-1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, -1, 0, 0, 0],
                [0, 0, 0, -1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]
        )
    })
    test('reverseToken', () => {
        expect(b.reverseToken(0, 0)).toEqual(
            [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, -1, 0, 0, 0],
                [0, 0, 0, -1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]
        )
        expect(b.reverseToken(3, 3)).toEqual(
            [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, -1, -1, 0, 0, 0],
                [0, 0, 0, -1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]
        )
        expect(b.reverseToken(3, 3)).toEqual(
            [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, -1, 0, 0, 0],
                [0, 0, 0, -1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]
        )
    })
    test('scanLine', () => {
        const D1: DIRECTION = { x: 1, y: 0 }
        const D2: DIRECTION = { x: 0, y: 1 }
        const D3: DIRECTION = { x: 1, y: 1 }
        const D4: DIRECTION = { x: -1, y: 1 }
        const S1: Square = {row: 0, col: 0}
        const S2: Square = {row: 3, col: 3}
        const S3: Square = {row: 3, col: 4}
        const S4: Square = {row: 3, col: 2}
        const S5: Square = {row: 2, col: 3}
        const S6: Square = {row: 4, col: 4}
        const S7: Square = {row: 0, col: 7}
        expect(b.scanLine(D1)(S1)).toEqual('BBBBBBB')
        expect(b.scanLine(D1)(S2)).toEqual('-1BBB')
        expect(b.scanLine(D1)(S3)).toEqual('BBB')
        expect(b.scanLine(D1)(S4)).toEqual('1-1BBB')
        expect(b.scanLine(D1)(S5)).toEqual('BBBB')
        expect(b.scanLine(D1)(S6)).toEqual('BBB')
        expect(b.scanLine(D2)(S1)).toEqual('BBBBBBB')
        expect(b.scanLine(D2)(S2)).toEqual('-1BBB')
        expect(b.scanLine(D2)(S6)).toEqual('BBB')
        expect(b.scanLine(D3)(S1)).toEqual('BB11BBB')
        expect(b.scanLine(D4)(S7)).toEqual('BB-1-1BBB')
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
})
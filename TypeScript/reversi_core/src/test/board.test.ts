import BOARD from '../board'
import { DIRECTION, Token } from '../board'

const board = new BOARD()
let t: number = 0

describe('TEST TO BOARD', () => {
    afterEach(() => {
        board.initState()
    })
    test('initialize', () => {
        console.log(board.state)
        expect(board.state).toEqual(
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
        expect(board.putWhite(0, 0)).toEqual(
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
        expect(board.putBlack(0, 0)).toEqual(
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
        expect(board.reverseToken(0, 0)).toEqual(
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
        expect(board.reverseToken(3, 3)).toEqual(
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
        expect(board.reverseToken(3, 3)).toEqual(
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
        expect(board.scanLine(D1)(0, 0)).toEqual('BBBBBBB')
        expect(board.scanLine(D1)(3, 3)).toEqual('-1BBB')
        expect(board.scanLine(D1)(4, 4)).toEqual('BBB')
        expect(board.scanLine(D2)(0, 0)).toEqual('BBBBBBB')
        expect(board.scanLine(D2)(3, 3)).toEqual('-1BBB')
        expect(board.scanLine(D2)(4, 4)).toEqual('BBB')
        expect(board.scanLine(D3)(0, 0)).toEqual('BB11BBB')
        expect(board.scanLine(D4)(7, 0)).toEqual('BB-1-1BBB')
    })
    test('enablePutSquares', () => {
        expect(board.enablePutSquares(Token.WHITE)).toEqual([
            { "col": 4, "row": 2 },
            { "col": 5, "row": 3 },
            { "col": 2, "row": 4 },
            { "col": 3, "row": 5 }
        ])
        expect(board.enablePutSquares(Token.BLACK)).toEqual([
            { "col": 3, "row": 2 },
            { "col": 2, "row": 3 },
            { "col": 5, "row": 4 },
            { "col": 4, "row": 5 }
        ])
    })
})
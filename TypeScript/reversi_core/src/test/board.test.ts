import BOARD from '../board'

const board = new BOARD()

describe('TEST TO BOARD', () => {
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
})
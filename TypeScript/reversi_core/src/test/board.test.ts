import { getRow, abs, toggle0and1, setSquare } from '../board'

const TEST_BOARD = [[0, 0, 0], [1, 1, 1], [2, 2, 2]]

test('getRow()', () => {
    expect(getRow(TEST_BOARD)(1)).toEqual([1, 1, 1])
})

test('abs()', () => {
    expect(abs(1)).toEqual(1)
    expect(abs(-1)).toEqual(1)
})

test('toggle0and1', () => {
    expect(toggle0and1(1)).toEqual(0)
    expect(toggle0and1(0)).toEqual(1)
})

test('setSquare', () => {
    const BOARD = TEST_BOARD.map(x => x)
    const BOARD_BROKEN = [[0, 0, 0], [1, 9, 1], [2, 2, 2]]
    setSquare(TEST_BOARD)(9)(1)(1)
    expect(BOARD).toEqual(BOARD_BROKEN)
})
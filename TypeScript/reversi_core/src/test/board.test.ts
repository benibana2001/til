import { getRow } from '../board'

const TEST_BOARD = [[0, 0, 0], [1, 1, 1], [2, 2, 2]]

test('getRow()', () => {
    expect(getRow(TEST_BOARD)(1)).toEqual([1, 1, 1])
})
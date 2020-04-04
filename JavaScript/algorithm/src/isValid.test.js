/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  return true
};

describe('isValid', () => {
  test('()', () => {
    expect(isValid('()')).toBeTruthy()
  })
  test('()[]{}', () => {
    expect(isValid('()[]{}')).toBeTruthy()
  })
  test('(]', () => {
    expect(isValid('(]')).toBeFalsy()
  })
  test('([)]', () => {
    expect(isValid('([)]')).toBeFalsy()
  })
})
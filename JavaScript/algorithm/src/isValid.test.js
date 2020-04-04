/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  const length = s.length
  const notEven = s.length % 2 !== 0
  if (notEven) return false
  //
  const half = length / 2
  const counter = 0
  //
  for (let i = half, j = counter; i > 0; i--, j++) {
    // check
    const matcher = s[2 * (j + 1)]
    if (s[i] === s[i + 1]) return true
    // if (s[i - 1] === s[i + 3]) return true
    // if (s[i - 3] === s[i + 5]) return true
  }
  return false
}
//
const pare = [
  ['[', ']'],
  ['{', '}'],
  ['(', ')']
]
//
const isMatch = (s1, s2) => {
  for (let i = 0; i < pare.length; i++) {
    const open = pare[i][0]
    const close = pare[i][1]
    if (s1 === open && s2 === close) return true
  }
  return false
}
//
describe('isMatch', () => {
  test('', () => {
    expect(isMatch('[', ']')).toBeTruthy()
  })
  test('', () => {
    expect(isMatch('{', '}')).toBeTruthy()
  })
  test('', () => {
    expect(isMatch('(', ')')).toBeTruthy()
  })
  test('', () => {
    expect(isMatch('[', '}')).toBeFalsy()
  })
  test('', () => {
    expect(isMatch('(', '}')).toBeFalsy()
  })
})

// describe('isValid', () => {
//   test('()', () => {
//     expect(isValid('()')).toBeTruthy()
//   })
//   test('()[]{}', () => {
//     expect(isValid('()[]{}')).toBeTruthy()
//   })
//   test('(]', () => {
//     expect(isValid('(]')).toBeFalsy()
//   })
//   test('([)]', () => {
//     expect(isValid('([)]')).toBeFalsy()
//   })
// })
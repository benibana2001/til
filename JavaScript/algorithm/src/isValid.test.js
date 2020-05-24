/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (s) => {
  let stack = []
  for(let i = 0; i < s.length; i++) {
    if(match[s[i]]) {
      stack.push(s[i])
    } else {
      let open = stack.pop()
      if (!match[open] || match[open] !== s[i]) {
        return false
      }
    }
  }
  return !stack.length
}
//
const match = {
  '(': ')',
  '{': '}',
  '[': ']'
}

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
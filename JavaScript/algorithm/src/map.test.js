const map = new Map()
map.set('1', 'str1')
map.set(1, 'num1')
map.set(true, 'bool1')

// Can use object as a key
const john = { name: "John" }
const visitsCountMap = new Map()
const visitsCountObj = {}
visitsCountMap.set(john, 123)
visitsCountObj[john] = -1

describe('map', () => {
  test('', () => {
    expect(map.get(1)).toBe('num1')
    expect(map.get('1')).toBe('str1')
    expect(map.get(true)).toBe('bool1')
  })
  test('Use object as a key', () => {
    expect(visitsCountMap.get(john)).toBe(123)
    expect(visitsCountObj["[object Object]"]).toBe(-1)
  })
})
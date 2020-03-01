const ary2str = (str) => str.split('')
const str2aryReverse = (ary) => {
    let str = ''
    for (let i = ary.length - 1; i >= 0; i--) str += ary.pop()
    return str
}
const reversStr = (str) => str2aryReverse(ary2str(str))

test('ary2str', () => {
    expect(ary2str('s')).toEqual(['s'])
    expect(ary2str('str')).toEqual(['s', 't', 'r'])
    expect(ary2str('')).toEqual([])
})

test('str2aryReverse', () => {
    expect(str2aryReverse(['s'])).toEqual('s')
    expect(str2aryReverse(['s', 't', 'r'])).toEqual('rts')
    expect(str2aryReverse([])).toEqual('')
})

test('reversStr', () => {
    expect(reversStr('str')).toEqual('rts')
    expect(reversStr('s')).toEqual('s')
    expect(reversStr('')).toEqual('')
})
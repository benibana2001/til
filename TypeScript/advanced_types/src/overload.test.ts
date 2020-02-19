function condense(string: string): string
function condense(array: string[]): string[]
function condense(strOrAry: string | string[]): string | string[] {
    return typeof strOrAry === 'string'
        ? strOrAry.split(" ").join("")
        : strOrAry.map(item => item.split(" ").join(""))
}
test('', () => {
    // definetly text's type is string. not string[].
    let text = condense('the cat sat on the mat')
    expect(text).toEqual('thecatsatonthemat')
})
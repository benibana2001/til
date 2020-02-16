const once = (fn) => {
    let isDone = false
    return (...args) => {
        if (!isDone) {
            isDone = true
            fn(...args)
        }
    }
}
const times = (num) => (fn) => {
    for (i=0; i<num; i++) fn()
}
test('callable 3 times', () => {
    const mockCallback = jest.fn();
    times(3)(mockCallback)
    expect(mockCallback.mock.calls.length).toBe(3)
})
test('once called only once', () => {
    const mockCallback = jest.fn()
    times(3)(once(mockCallback))
    expect(mockCallback.mock.calls.length).toBe(1)
})
const once = (fn) => {
    let isDone = false
    return (...args) => {
        if (!isDone) {
            isDone = true
            fn(...args)
        }
    }
}
const onceAndAfter = (f, g) => {
    let isDone = false
    return (...args) => {
        if (!isDone) {
            isDone = true
            f(...args)
        } else {
            g(...args)
        }
    }
}
const times = (num) => (fn) => { for (i = 0; i < num; i++) fn() }
test('callable 3 times', () => {
    const mockFn = jest.fn();
    times(3)(mockFn)
    expect(mockFn.mock.calls.length).toBe(3)
})
test('callable 3 times by mock implementation', () => {
    const add = (a, b) => a + b
    const mockFn = jest.fn(add)
    mockFn(10, 13)
    mockFn(24, 193)
    expect(mockFn.mock.calls[0][0]).toBe(10)
    expect(mockFn.mock.calls[1][0]).toBe(24)
    expect(mockFn.mock.results[0].value).toBe(23)
    expect(mockFn.mock.results[1].value).toBe(24 + 193)
})
test('once called only once', () => {
    const mockCallback = jest.fn()
    times(3)(once(mockCallback))
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback).toHaveBeenCalledTimes(1)
})
test('should call the first function only once, and the other after.', () => {
    const mockOnce = jest.fn()
    const mockAfter = jest.fn()
    times(3)(onceAndAfter(mockOnce, mockAfter))
    expect(mockOnce.mock.calls.length).toBe(1)
    expect(mockAfter.mock.calls.length).toBe(2)
})
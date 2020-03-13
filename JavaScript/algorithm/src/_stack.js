class Stack {
    /**
     * @param {any[]} ary 
     */
    constructor(ary) {
        if (ary) this.ary = ary
    }
    getBuffer() {
        return this.ary.slice()
    }
    isEmpty() {
        return this.ary.length === 0
    }
    push(value) {
        return this.ary.push(value)
    }
    pop() {
        return this.ary.pop()
    }
}
/**
 * @param {Stack} stack
 * @param {number} n
 */
const stackAccessNthTopNode = (stack, n) => {
    const bufferArray = stack.getBuffer()
    if (n <= 0) throw 'error';
    const bufferStack = new Stack(bufferArray)
    while (--n!==0){
        bufferStack.pop()
    }
    return bufferStack.pop()
}

const stack1 = new Stack([1, 2, 3, 4, 5, 6, 7])

console.log(stackAccessNthTopNode(stack1, 3))
console.log(stack1.getBuffer())

// const addLoggin = fn => (...args) => {
//
// }

// In TypeScript, we cannot refer `function.name` property
//   not only defined as a any function.
const addLgging = (fn: any) => (args: number[]) => {
    console.log(`entering ${fn.name}: ${args}`)
    const valueToReturn = fn(args)
    console.log(`existing ${fn.name}: ${valueToReturn}`)
    return valueToReturn
}

const plus = (args: number[]) => {
    const sum = (acc: number, car: number) => acc + car
    return args.reduce(sum)
}
console.log(plus([1, 2, 3]))
console.log(addLgging(plus)([1, 2, 3]))
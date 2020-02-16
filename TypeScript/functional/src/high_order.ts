// In TypeScript, we cannot refer `function.name` property
//   not only defined as a any function.
const addLgging = (fn: any) => <T>(args: T[]) => {
    console.log(`entering ${fn.name}: ${args}`)
    const valueToReturn = fn(args)
    console.log(`existing ${fn.name}: ${valueToReturn}`)
    return valueToReturn
}

// About a reduce function
//   https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
let concat = (args: string[]) => {
    const fn = (acc: string, car: string) => acc + car
    return args.reduce(fn)
}

concat = addLgging(concat)
concat(['I ', 'am ', 'a ', 'boy!'])
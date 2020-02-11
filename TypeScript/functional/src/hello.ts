const myFldr = (operant: Function): any => (initial: number) => (list: number[]) => list.length === 0 ? initial : operant(list[0])(myFldr(operant)(initial)(list.slice(1)))

const sum = (a: number) => (b: number) => a + b
const product = (a: number) => (b: number) => a * b

const rSum = myFldr(sum)(0)
const rProduct = myFldr(product)(1)

const ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(rSum(ary)) //  55
console.log(rProduct(ary)) //  3628800

/*
途中式
const mySum = (list: number[]): number => list.length === 0 ? 0 : list[0] + mySum(list.slice(1))
const myProduct = (list: number[]): number => list.length === 0 ? 1 : list[0] * myProduct(list.slice(1))
const myFldr = (operant: Function): any => (initial: number) => (list: number[]) => {
    if (list.length === 0) return initial
    return operant(list[0])(myFldr(operant)(initial)(list.slice(1))) 
}
*/
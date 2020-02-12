const counter = (init: number) => {
    let countingNumber = init
    return () => {
        countingNumber += 1
        return countingNumber
    }
}
const counterFrom0 = counter(0)
const counterFrom10 = counter(10)
// console.log(counterFrom10())
// console.log(counterFrom10())
// console.log(counterFrom10())
// console.log(counterFrom0())

const object = {
    empty: () => null,
    set: (key: string, value: string) => (obj: Function | null) => (queryKey: string) => {
        if (key === queryKey) return value
        else return object.get(queryKey)(obj)
    },
    get: (key: string) => (obj: any) => obj(key)
}
let obj = object.set("C3PO", "Star Wars")(object.empty()) // key, value を保持するクロージャ
console.log(object.get("C3PO")(obj))

const store = {
    empty: () => null,
    set: (key: number, value: string) => (obj: { key: number, value: string }[]) => (queryKey: number) => {
        if (key === queryKey) return value
        else return store.get(queryKey)(obj)
    },
    get: (key: number) => (obj: any) => obj(key)
}
const compose = (f: Function, g: Function) => (arg: any) => f(g(arg))
const Customer = compose(store.set(1, "Acony"), store.set(2, "Motomi"))(store.empty())
console.log(store.get(1)(Customer))
console.log(store.get(2)(Customer))

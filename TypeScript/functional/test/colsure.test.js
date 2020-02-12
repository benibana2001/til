const assert = require('chai').assert
const object = {
    empty: () => null,
    set: (key, value) => (obj) => (queryKey) => {
        if (key === queryKey) return value
        else return object.get(queryKey)(obj)
    },
    get: (key) => (obj) => obj(key)
}
const obj = object.set("C3PO", "Star Wars")(object.empty()) // key, value を保持するクロージャ
//
const store = {
    empty: () => null,
    set: (key, value) => (obj) => (queryKey) => {
        if (key === queryKey) return value
        else return store.get(queryKey)(obj)
    },
    get: (key) => (obj) => obj(key)
}
const compose = (f, g) => (arg) => f(g(arg))
const Customer = compose(store.set(1, "Acony"), store.set(2, "Motomi"))(store.empty())
//
describe('Closure', () => {
    describe('store', () => {
        it('should return name', () => {
            assert.equal(store.get(1)(Customer), "Acony")
            assert.equal(store.get(2)(Customer), "Motomi")
        })
    })
})
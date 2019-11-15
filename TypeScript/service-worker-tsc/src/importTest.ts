export { Test }
class Test {
    private value: string = 'Takayuki Yamada'
    public getValue = (): string => {
        return "Hello, I'm " + this.value
    }
}
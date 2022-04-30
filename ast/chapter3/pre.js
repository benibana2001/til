const {transform} = require('@babel/core')

const plugin = babel => {
    return {
        pre() {
            console.log('pre', this.constructor.name)
            this.hoge = 'hoge'
        },
        visitor: {
            Program: (nodePath, state) => {
                console.log(state.constructor.name)
                console.log(state.hoge)
            }
        }
    }
}
transform('1 + 2', {plugins: [plugin]})
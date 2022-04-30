const {transform} = require('@babel/core')

const plugin = babel => {
    return {
        visitor: {
            Program: (nodePath, state) => {
                console.log(state.opts)
            }
        }
    }
}

const plugins = [
    [plugin, {hoge: 'hoge'}]
]

transform('1 + 2', {plugins})
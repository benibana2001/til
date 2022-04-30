const {transform} = require('@babel/core')

const plugin = babel => {
    const {traverse, types: t, template, version} = babel
    console.log(version)

    return {
        visitor: {
            BinaryExpression: nodePath => {
                console.log(t.isExpression(nodePath))
                console.log(nodePath.node.operator)
            }
        }
    }
}

transform('1 + 2', {plugins: [plugin]})
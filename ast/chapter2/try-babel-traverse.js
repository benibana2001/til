const babylon = require('babylon')
const traverse = require('@babel/traverse').default

const ast = babylon.parse('1*2\n1+1')

const visitor = {
    BinaryExpression: (nodePath) => {
        console.log(nodePath.node) // --> Node {...}
    }
}

traverse(ast, visitor)
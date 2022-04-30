const {parse} = require('babylon')
const traverse = require('@babel/traverse').default

const src = '1 + 2'

const ast = parse(src)
const visitor = {
    enter(nodePath) {
        console.log(`enter: ${nodePath.type}`)
    },
    exit(nodePath) {
        console.log(`exit: ${nodePath.type}`)
    },
    NumericLiteral: {
        enter(nodePath) {
            console.log('NumericLiteral enter')
        },
        exit(nodePath) {
            console.log('NumericLiteral exit')
        }
    },
    BinaryExpression(nodePath) {
        // 省略した場合はenter処理とみなされる
        console.log('BinaryExpression enter')
    }
}

traverse(ast, visitor)
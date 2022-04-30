const {transform} = require('@babel/core')

const sourceCode = '1 + 2'
const opts = {plugins: []}

const {code, ast, map} = transform(sourceCode, opts)
console.log(code)
console.log(ast)
console.log(map)
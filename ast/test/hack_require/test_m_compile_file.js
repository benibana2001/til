const Module = require('module')

const originalLoad = Module._load

Module._load = function(name, parent, isMain) {
    const module = new Module()
    module._compile('console.log("new cord")', 'newFile')
    console.log(module.exports)
}
const obj = require('hoge')
console.log(obj)
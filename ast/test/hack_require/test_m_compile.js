const Module = require('module')

Module._extensions['.js'] = function(m, name) {
    console.log(name)
    console.log(m)
    return m._compile('const a = () => 1;console.log(a()) ', name)
}

require('./hoge')
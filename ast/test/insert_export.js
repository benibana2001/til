const {transform} = require('@babel/core');

const source = 'function hoge() {}';

const targetId = 'hoge';
const replaceCode = 'function hoge() {return 2}';

const WasCreated = Symbol('WasCreated');

const plugin = ({types: t, template}) => {
    return {
        visitor: {
            FunctionDeclaration: (nodePath, state) => {
                if(!t.isIdentifier(nodePath.node.id)) {
                    return
                }
                if(nodePath.node.id.name === targetId) 

                }
            }
        }
    }
}

console.log(transform(source, {plugins: [plugin]}).code)
const {transform} = require('@babel/core');

const source = 'function hoge() {return 1}';

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
                if(nodePath.node.id.name === targetId) {
                    // const newAst = template(replaceCode)();
                    // nodePath.replaceWith(newAst);
                    // nodePath[WasCreated] = true;
                    // nodePath.insertBefore(t.expressionStatement(t.stringLiteral("export ")));
                    // nodePath.insertBefore(t.exportNamedDeclaration());
                    const id = nodePath.scope.generateUidIdentifierBasedOnNode(nodePath.node.id);
                    nodePath.remove();
                    nodePath.scope.parent.push({ id, init: nodePath.node });
                }
            }
        }
    }
}

console.log(transform(source, {plugins: [plugin]}).code)
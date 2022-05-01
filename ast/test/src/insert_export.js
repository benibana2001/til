const { parseExpression } = require("babylon");
const { transform } = require("@babel/core");

const WasCreated = Symbol("WasCreated");

// const source = 'function hoge() {}';

const insertCode = 'export {hoge}'

const plugin = ({ types: t, template }) => {
  const visitor = {
    FunctionDeclaration: (nodePath, state) => {
      if (!t.isIdentifier(nodePath.node.id)) {
        return;
      }
    },
    Program: {
      exit: (nodePath, state) => {
        const newAst = template(insertCode)();
        nodePath.pushContainer("body", newAst);
      },
    },
  };
  return {
      name: 'insert-export',
      visitor,
  }
};

module.exports = plugin

// console.log(transform(source, { plugins: [plugin] }).code);

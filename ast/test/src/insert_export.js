const exportLiteral = (array) => {
  if (!Array.isArray(array) || !array.length > 0) return "";
  return `
export {
  ${array.join(",\n  ")}
}
`;
};

const plugin = ({ types: t, template }) => {
  const pre = function () {
    this.members = [];
  };
  const visitor = {
    VariableDeclarator: (nodePath, state) => {
      if (!t.isIdentifier(nodePath.node.id)) return;
      state.members.push(nodePath.node.id.name);
    },
    FunctionDeclaration: (nodePath, state) => {
      if (!t.isIdentifier(nodePath.node.id)) {
        return;
      }
      state.members.push(nodePath.node.id.name);
    },
    Program: {
      exit: (nodePath, state) => {
        const newAst = template(exportLiteral(state.members))();
        nodePath.pushContainer("body", newAst);
      },
    },
  };
  return {
    name: "insert-export",
    pre,
    visitor,
  };
};

module.exports = plugin;

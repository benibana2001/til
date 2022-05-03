module.exports = {
  meta: {},
  create: function (context) {
    return {
      MemberExpression: function (node) {
        if (node.Object.name === "console") {
          context.report({
            node,
            message: "Unexpected console statement.",
          });
        }
      },
    };
  },
};

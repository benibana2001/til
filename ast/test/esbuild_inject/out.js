(() => {
  // test/esbuild_inject/declarations.js
  var declarations_exports = {};

  // test/esbuild_inject/index.js
  Object.assign(window, declarations_exports);
})();

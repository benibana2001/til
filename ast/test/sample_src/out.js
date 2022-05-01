// test/sample_src/index.js
var files = ["./functions.js", "./declarations.js"];
var moduleObjects = async () => {
  return Promise.all(files.map((file) => import(file))).then((modules) => modules.reduce((obj, module) => ({
    ...obj,
    ...module
  })), {});
};
moduleObjects().then((res2) => Object.assign(window, res2));
console.log(res);

(() => {
  // test/sample_src/index.js
  var modules = [
    "./functions.js",
    "./declarations.js"
  ];
  console.log();
  const moduleObjects = async () => {
    const newModules = await modules.map(async (module) => await import(module));
    console.log(newModules)
  };
  moduleObjects();
})();

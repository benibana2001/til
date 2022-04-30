const files = ["./functions.js", "./declarations.js"];

const moduleObjects = async () => {
  return Promise.all(files.map(file => import(file))).then(
    modules =>
      modules.reduce((obj, module) => ({
        ...obj,
        ...module,
      })),
    {}
  );
};

moduleObjects().then((res) => console.log(res));

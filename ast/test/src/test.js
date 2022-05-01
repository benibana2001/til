const { transform } = require("@babel/core");
const fs = require("fs");
const files = ["./sources/declarations.js", "./sources/functions.js"];

files
  .map((file) => fs.readFileSync(file, { encoding: "utf8" }))
  .forEach((src) => {
    const { code } = transform(src, {
      plugins: [require("./insert_export.js")],
    });
    console.log(code);
  });

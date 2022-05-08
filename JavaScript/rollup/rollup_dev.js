import * as rollup from "rollup";
import { babel } from "@rollup/plugin-babel";

const inputOptions = {
  input: "src_not_exported/index.js",
  plugins: [babel()],
};
const outputOptions = {
  format: "es",
  file: "dist/bundle.js",
};
build(inputOptions, outputOptions);

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

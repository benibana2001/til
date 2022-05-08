import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
export default {
  input: "src/main_dev.js",
  output: {
    file: "bundle.js",
    format: "cjs",
    inlineDynamicImports: true,
  },
  plugins: [
    babel({ babelHelpers: "bundled" }),
  ],
};

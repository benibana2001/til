import pug from 'rollup-plugin-pug';
import scss from "rollup-plugin-scss";

export default {
  input: "src/scripts/index.js",
  output: {
    dir: "public",
    format: "esm",
  },
  plugins: [
    scss({
      output: "public/index.css",
      sass: require("sass"),
      watch: "src/scss",
    }),
  ],
};

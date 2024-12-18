export default function (api) {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          loose: true,
          modules: false,
        },
      ],
    ],
    plugins: ["babel-plugin-export-window-declarations"],
  };
};

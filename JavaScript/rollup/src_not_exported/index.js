import * as declarations from "./declarations.js";
(() => {
  window = window || {};
  window = {
    ...window,
    ...declarations,
  };
  console.log(window);
})();

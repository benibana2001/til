import * as declarations from "./declarations.js";
import * as functions from "./functions.js";
import * as jQuery from "./jQuery.js";
(() => {
  window = window || {};
  window = {
    ...window,
    ...declarations,
    ...functions,
    ...jQuery
  };
  console.log(window);
})();

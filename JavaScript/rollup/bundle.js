'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function main_dev () {
  console.log("This is Dev Env");
  Promise.resolve().then(function () { return foo$1; }).then(({ default: foo }) => console.log(foo));
}

var foo = 'hello world';

var foo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': foo
});

exports.main_dev = main_dev;

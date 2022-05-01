function a() {
  console.log("a");
}

function b() {
  console.log("b");
}

var c = function () {
  console.log("c");
};

var d = function (name) {
  this._name = name;
};

d.prototype = {
  _call: function () {
    console.log(this._name);
  },
};

$(function () {
  doSomething();
});

function doSomething() {
  console.log("do something");
}

jQuery.extend.fn = {
  doSomething: function () {
    console.log("jQuery.extend");
  },
};

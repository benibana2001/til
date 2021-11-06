const test = () => {
  /**
   * Create Promise Object
   */
  const promiseObj = new Promise(promiseFunc);
  /**
   * Create Promise Function
   */
  function promiseFunc(resolve, reject) {
    setTimeout(() => {
      resolve("Hello world!");
    }, 2000);
  }

  return promiseObj;
};

console.log("start");
test().then((value) => {
  console.log(value);
});

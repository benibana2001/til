/**
 * await
 */
async function asyncMain() {
  const value = await Promise.resolve(42);
  console.log(value);
}
// asyncMain();

/**
 * Promise.resolve
 */
function main() {
  return Promise.resolve(42).then((value) => {
    console.log(value);
  });
}
// main();

/**
 * Promise Object
 */
function main2() {
  return new Promise((resolve) => {
    resolve(42);
  });
}
// main2().then((value) => console.log(value));

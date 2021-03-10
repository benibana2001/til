const test = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello world!"), 2000);
  });
};

console.log("start");
test().then((value) => {
  console.log(value);
});

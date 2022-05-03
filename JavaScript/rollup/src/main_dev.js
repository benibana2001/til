export function main_dev () {
  console.log("This is Dev Env");
  import("./foo.js").then(({ default: foo }) => console.log(foo));
}

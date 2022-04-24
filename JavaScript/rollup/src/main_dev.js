export default function () {
  console.log("This is Dev Env");
  import("./foo.js").then(({ default: foo }) => console.log(foo));
}

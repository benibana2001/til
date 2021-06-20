function main_dev () {
  import('./foo-deb33593.js').then(({ default: foo }) => console.log(foo));
}

export default main_dev;

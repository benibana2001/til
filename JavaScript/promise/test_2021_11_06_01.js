const fetch = require("node-fetch");
const URL = require("./urls.js");
async function fetchBookTitle() {
  const res = await fetch(URL.AZU.JSON.BOOK);
  const json = res.json();
  return json;
}
async function main() {
  const json = await fetchBookTitle();
  console.log(json.title);
}

main();

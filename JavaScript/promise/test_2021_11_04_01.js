const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const fetchUrl = (URL) => {
  const promiseFunc = (resolve, reject) => {
    // りくえすとをさくせい
    const req = new XMLHttpRequest();
    req.open("GET", URL, true);
    // 非同期処理
    req.onload = () => {
      if (200 <= req.status && req.status < 300) {
        resolve(req.responseText);
      } else {
          console.log(req);
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.send();
  };
  return new Promise(promiseFunc);
};

const URL = "https://httpbin.org/get";
fetchUrl(URL)
  .then(function onfFullfilled(value) {
    console.log(value);
  })
  .catch(function onRejected(error) {
    console.error(error);
  });

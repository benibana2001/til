const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/**
 * Test API
 * https://open-meteo.com/en
 */
const URL = require("./urls.js");
const fetchUrl = (URL) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", URL, true);
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
  });
};
const request = {
  comment() {
    return fetchUrl(URL.AZU.JSON.COMMENT).then(JSON.parse);
  },
  people() {
    return fetchUrl(URL.AZU.JSON.PEOPLE).then(JSON.parse);
  },
  weather() {
    return fetchUrl(URL.WEATHER).then(JSON.parse);
  },
};
const main = () => {
  return Promise.all([request.comment(), request.people(), request.weather()]);
};

main()
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error(error);
  });

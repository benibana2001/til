function parseJSONAsync(json) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("一個目を実行");
      try {
        resolve(JSON.parse(json));
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
}

parseJSONAsync('{ "hoge": 1 }')
  .then(parseJSONAsync2)
  .then(
    (value) => {
      console.log(value);
    },
    (err) => {
      console.error(err.message);
    }
  );

function parseJSONAsync2(obj) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log("二個目を実行");
        resolve(obj.hoge);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
}

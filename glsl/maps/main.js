(async () => {
  const FILE_PATH = "./walking.json";
  const client = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  }

  // CSVをfetch
  const fetchJson = async () => {
    const json = await fetch(FILE_PATH).then((res) => {
      return res.json();
    });
    return json;
  };
  const json = await fetchJson();

  // 取得したCSVをパースして２次元配列として保持
  let points = [];
  let MAX_SIZE = {
    x: 0,
    y: 0,
  }
  let MIN_SIZE = {
    x: 99999,
    y: 99999,
  }
  for(let p in json) {
    const value = json[p];
    const ary = value.split(", ").map(xy => {
      const values = xy.split(" ");
      return values.map(value => Number(value))
    });
    points.push(ary)

    // 最大値をセットしておく
    for(let point of ary) {
      if(point[0] > MAX_SIZE.x) {
        MAX_SIZE.x = point[0]
      }
      if(point[1] > MAX_SIZE.y) {
        MAX_SIZE.y = point[1]
      }
      if(point[0] < MIN_SIZE.x) {
        MIN_SIZE.x = point[0]
      }
      if(point[1] < MIN_SIZE.y) {
        MIN_SIZE.y = point[1]
      }
    }
  }

  // 二次元配列を0~1の範囲で正規化
  points = points.map(row => {
     return row.map(point => {
      return [
        point[0] - MIN_SIZE.x,
        point[1] - MIN_SIZE.y
      ]
     })
  })

  console.log(points)
})();

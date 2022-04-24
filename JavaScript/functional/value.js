var position = (function (x, y) {
  return {
    getX: () => {
      return x;
    },
    getY: () => {
      return y;
    },
  };
})(5, 9);

function zipCode(code, location) {
  let _code = code;
  let _location = location || "";

  return {
    code: function () {
      return _code;
    },
    location: function () {
      return _location;
    },
    fromString: function (str) {
      let parts = str.split("");
      return zipCode(parts[0], parts[1]);
    },
    toString: function () {
      return _code + "-" + _location;
    },
  };
}

function cordinate(lat, long) {
  let _lat = lat;
  let _long = long;

  return {
    latitude: function () {
      return _lat;
    },
    longitude: function () {
      return _long;
    },
    translate: function (dx, dy) {
      return cordinate(_lat + dx, _long + dy);
    },
    toString: function () {
      return `(${_lat},${_long})`;
    },
  };
}

console.log(position.getX());
position.x = 1;
console.log(position.getX());

let princetonZip = zipCode("08544", "3345");
console.log(princetonZip.code());
Object.freeze(princetonZip);
console.log(princetonZip.code());

const greenwitch = cordinate(51.4778, 0.0015);
console.log(greenwitch.toString());
console.log(greenwitch.translate(10, 10).toString());

/**
 * call 関数の用法...なりすまし
 */
class Girl {
  constructor() {
    this.name = "girl";
  }
  enter() {
    console.log(this.name + " enter the room");
  }
}
class Boy {
  constructor() {
    this.name = "boy";
  }
}
new Girl().enter();
new Girl().enter.call(new Boy());

/**
 * JSはブロックスコープを持たない。
 * if文ないの定義がブロックスコープとなる
 */
function doWork() {
  if (!myVar) {
    var myVar = 10;
  }
  console.log(myVar); // 実行される
}
doWork();

(function () {
  var judge = (playerL, playerR) => {
    if (playerR.score > playerL.score) {
      return playerR;
    } else if (playerR.score < playerL.score) {
      return playerL;
    } else {
      return null;
    }
  };

  var announce = (winner) => {
    if (winner) {
      return `${winner.name}が勝者です。`;
    } else {
      return "引き分けです。";
    }
  };

  var displayWinner = (winner) => {
    console.log(announce(winner));
  };

  var takashi = {
    name: "たかし",
    score: 10,
  };
  var hiroshi = {
    name: "ひろし",
    score: 20,
  };

  displayWinner(judge(takashi, hiroshi)); //'hiroshiが勝者です'
})();
(function () {
  var sum = (array) => {
    var reducer = (accumulator, item) => {
      return accumulator + item;
    };
    var start = 0;
    return array.reduce(reducer, start);
  };
  console.log(sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
})();

(function () {
  var product = (array) => {
    var start = 1;
    var reducer = (accumulator, item) => {
      return accumulator * item;
    };
    return array.reduce(reducer, start);
  };
  console.log(product([1, 2, 3, 4, 5]));
})();

(function () {
  function toConsumableArray(t) {
    if (Array.isArray(t)) {
      // 新たな配列を作成
      for (var e = 0, n = Array(t.length); e < t.length; e++) {
        n[e] = t[e];
      }
      return n;
    }
    // 配列に変換
    return Array.from(t);
  }

  function classCallCheck(t, e) {
    if (!(t instanceof e)) {
      throw new TypeError("cannot call a class as a function");
    }
  }

  function init() {
    var t = window,
      e = document;
    var createClass = (function () {
      function t(t, e) {
        // e: array
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (i.enumerable = )
        }
      }
    })();
  }
});

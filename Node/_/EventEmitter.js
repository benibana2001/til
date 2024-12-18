const events = require("events");
/**
 * EventEmitterの動作確認
 */
// (() => {

//   function startListener() {
//     console.log("start");
//   }
//   function fizzListener(count) {
//     console.log("Fizz", count);
//   }
//   function buzzListner(count) {
//     console.log("Buzz", count);
//   }

//   function fizzBuzzListner(count) {
//     console.log("FizzBuzz", count);
//   }
//   function endListner() {
//     console.log("end");
//     this.off("start", startListener)
//       .off("Fizz", fizzListener)
//       .off("Buzz", buzzListner)
//       .off("FizzBuzz", fizzBuzzListner)
//       .off("end", endListner);
//   }

//   function createFizzBuzzEventEmitter(until) {
//     const eventEmitter = new events.EventEmitter();
//     // イベントの実行を常に非同期にするため、process.nextTick()を利用
//     process.nextTick(() => _emitFizzBuzz(eventEmitter, until));
//     return eventEmitter;
//   }

//   async function _emitFizzBuzz(eventEmitter, until) {
//     eventEmitter.emit("start");
//     let count = 1;
//     while (count <= until) {
//       await new Promise((resolve) => setTimeout(resolve, 100));
//       if (count % 15 === 0) {
//         eventEmitter.emit("FizzBuzz", count);
//       } else if (count % 3 === 0) {
//         eventEmitter.emit("Fizz", count);
//       } else if (count % 5 === 0) {
//         eventEmitter.emit("Buzz", count);
//       }
//       count += 1;
//     }

//     eventEmitter.emit("end");
//   }

//   createFizzBuzzEventEmitter(40)
//     .on("start", startListener)
//     .on("Fizz", fizzListener)
//     .on("Buzz", buzzListner)
//     .on("FizzBuzz", fizzBuzzListner)
//     .on("end", endListner);
// })();

/**
 * 登録されたリスナは同期的に実行される
 */
// (() => {
// const fooEventEmitter = new events.EventEmitter()
// fooEventEmitter.on('foo', () => {
//     console.log('fooeイベントリスナの実行')// 先に実行
// })
// console.log('fooイベント実行', fooEventEmitter.emit('foo'))// 後に実行
// })();

/**
 * エラーハンドリング
 */
// (() => {
//     const events = require('events')
//     try {
//         new events.EventEmitter()
//             // 下記の'error'イベントリスナの登録がないい場合はcatchに落ちる
//             .on('error', err => console.log('errorイベント'))
//             .emit('error', new Error('エラー'))
//     } catch (err) {
//         console.log('catch')
//     }
// })()

/**
 * EventEmitterの継承
 */
(() => {
  class FizzBuzzEventEmitter extends events.EventEmitter {
    async start(until) {
      this.emit("start");
      let count = 1;
      while (true) {
        if (count % 15 === 0) {
          this.emit("FizzBuzz", count);
        } else if (count % 3 === 0) {
          this.emit("Fizz", count);
        } else if (count % 5 === 0) {
          this.emit("Buzz", count);
        }
        count += 1;
        if (count >= until) break;
      }
      this.emit("end");
    }
  }
  function startListener() {
    console.log("start");
  }
  function fizzListener(count) {
    console.log("Fizz", count);
  }
  function buzzListner(count) {
    console.log("Buzz", count);
  }
  function fizzBuzzListner(count) {
    console.log("FizzBuzz", count);
  }
  function endListner() {
    console.log("end");
    this.off("start", startListener)
      .off("Fizz", fizzListener)
      .off("Buzz", buzzListner)
      .off("FizzBuzz", fizzBuzzListner)
      .off("end", endListner);
  }

  new FizzBuzzEventEmitter()
    .on('start', startListener)
    .on('Fizz', fizzListener)
    .on('Buzz', buzzListner)
    .on('FizzBuzz', fizzBuzzListner)
    .on('end', endListner)
    .start(20)
})();

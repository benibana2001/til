/**
 * 12.1 イテレータの仕組み
 */
(() => {
  let iterable = [99];
  let iterator = iterable[Symbol.iterator]();
  for (let result = iterator.next(); !result.done; result = iterator.next()) {
    console.log(result.value);
  }
})();

(() => {
  let list = [1, 2, 3, 4, 5];
  let iter = list[Symbol.iterator]();
  let head = iter.next().value;
  let tail = [...iter];
  console.log(`head: ${head}`);
  console.log(`tail: ${tail}`);
  console.log(`Array.isArray(tail): ${Array.isArray(tail)}`);
})();

/**
 * 12.2 反復可能オブジェクトの実装
 */
(() => {
  class Range {
    constructor(from, to) {
      this.from = from;
      this.to = to;
    }

    has(x) {
      return typeof x === "number" && this.from <= x && x <= this.to;
    }

    toString() {
      return `{ x | ${this.fromt} <= x ${this.to} }`;
    }

    [Symbol.iterator]() {
      let next = Math.ceil(this.from);
      let last = this.to;

      return {
        next() {
          return next <= last ? { value: next++ } : { done: true };
        },
        [Symbol.iterator]() {
          return this;
        },
      };
    }
  }

  function map(iterable, f) {
    let iterator = iterable[Symbol.iterator]();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let v = iterator.next();
        if (v.done) {
          return v;
        } else {
          return { value: f(v.value) };
        }
      },
    };
  }

  console.log([...map(new Range(1, 4), (x) => x * x)]);

  function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        for (;;) {
          let v = iterator.next();
          if (v.done || predicate(v.value)) {
            return v;
          }
        }
      },
    };
  }

  console.log([...filter(new Range(1, 10), (x) => x % 2 === 0)]);
})();

/**
 * 2.4.1 ジェネレータ関数
 */
(() => {
  function* generatorFunc() {
    console.log("start");
    console.log("yield 1");
    yield 1;
    console.log("yield 2");
    yield 2;
    console.log("yield 3");
    yield 3;
    console.log("end");
    return "戻り値";
  }
  // ジェネレータの生成
  const generator = generatorFunc();

  generator.next();
  generator.next();
  generator.next();
  generator.next();
  generator.next();
})();

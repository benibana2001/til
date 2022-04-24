const getH2 = () => {
  const PARENT_CLASS = ".list-container";
  const listContainer = document.querySelector("PARENT_CLASS")[0];
  if (listContainer.nodeName == "H2") {
  }
};

/**
 *
 * @param {NodeList} node
 */
const check = (nodeList) => {};

/**
 * NodeList.nodeName で、子Nodeをすべて確認できる
 * ・自分自身をチェックする関数
 * 　・チェックして見つからなかった場合
 * 　　・子供を更に持っているならば、自分が親となって、チェックさせる
 * 　　・子供を持っていないならば、自分は不要になる（終了）
 * 　・チェックして見つかった場合
 * 　　・見つかったものを返す
 * 　　・自分は不要になる
 *
 * ・親は子供にチェックさせる
 * 　・すべての子供をちぇっくする
 */

/**
 * よくわからんくなってきた
 * いったん、本を写経してみる
 */

/**
 * リストの代数的データ型
 * 
 * からのリストを作る処理
 * @returns
 */
var empty = () => {
  return (pattern) => {
    return pattern.empty();
  };
};
/**
 * リストに値を追加する処理
 * @param {} value 
 * @param {*} list 
 * @returns 
 */
var cons = (value, list) => {
  return (pattern) => {
    return pattern.cons(value, list);
  };
};
//
/**
 *
 * 代数的データ構造に対してパターンマッチを実現する関数
 * dataには代数的データ構造が入る
 * patternにはオブジェクト型のインスタンスが入る (?)
 * @param {*} data
 * @param {*} pattern
 * @returns
 */
var match = (data, pattern) => {
  return data(pattern);
};
/**
 *
 * @param {*} alist
 * @returns
 * @example toArray(cons("a", cons("b", empty())))
 */
var toArray = (alist) => {
  var toArrayHelper = (alist, accumlator) => {
    return match(alist, {
      empty: () => accumlator,
      cons: (head, tail) => {
        return toArrayHelper(tail, accumlator.concat(head));
      },
    });
  };
  return toArrayHelper(alist, []);
};

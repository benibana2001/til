/**
* @param {string} s
* @return {number}
*/

const romanToInt = function (s) {
    const ary = s.split('')
    const result = (list) => {
        let result = 0
        for (let i = 0, len = list.length; i < len; i++) {
            const current = applyHash(list[i])
            const next = list[i + 1] ? applyHash(list[i + 1]) : 0
            const doSubtraction = current < next
            doSubtraction ? result -= current : result += current
        }
        return result
    }
    return result(ary)
}
/**
 * @type {object} hash
 */
const hash = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
}
/**
 * @param {{string: number}} h 
 * @returns {(s: string) => number} 
*/
const convertInt = (h) => (s) => {
    if (h[s] !== undefined) {
        return h[s]
    }
}
const applyHash = convertInt(hash)

module.exports = romanToInt
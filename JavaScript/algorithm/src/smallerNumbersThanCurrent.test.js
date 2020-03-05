/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
    return (nums.sort((a, b) => a - b)).map(elem => elem - 1)
};

describe('defangingIpaddr', () => {
    test('[8,1,2,2,3]', () => {
        expect(smallerNumbersThanCurrent([8,1,2,2,3])).toBe([4,0,1,1,3])
    })
    test('[6,5,4,8]', () => {
        expect(smallerNumbersThanCurrent([6,5,4,8])).toBe([6,5,4,8])
    })
    test('[7,7,7,7]', () => {
        expect(smallerNumbersThanCurrent([7,7,7,7])).toBe([0,0,0,0])
    })
})
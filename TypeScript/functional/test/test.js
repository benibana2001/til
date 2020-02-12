// var assert = require('assert');
var assert = require('chai').assert
describe('Test', function () {
    describe('Test', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
            var foo = 'bar'
                , beverages = { tea: ['chai', 'matcha', 'oolong'] };
            assert.typeOf(foo, 'string'); // without optional message
            assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
            assert.equal(foo, 'bar', 'foo equal `bar`');
        });
    });
});

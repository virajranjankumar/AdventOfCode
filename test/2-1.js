const assert = require("assert").strict;
const { compute } = require("../src/2-1");

module.exports = () =>
  Promise.all([
    assert.deepStrictEqual(compute([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]),
    assert.deepStrictEqual(compute([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99]),
    assert.deepStrictEqual(compute([2, 4, 4, 5, 99, 0]), [
      2,
      4,
      4,
      5,
      99,
      9801,
    ]),
    assert.deepStrictEqual(compute([1, 1, 1, 4, 99, 5, 6, 0, 99]), [
      30,
      1,
      1,
      4,
      2,
      5,
      6,
      0,
      99,
    ]),
    assert.deepStrictEqual(
      compute([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]),
      [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
    ),
  ]);

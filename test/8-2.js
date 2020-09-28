const assert = require("assert").strict;
const { compute } = require("../src/8-2");

module.exports = () =>
  Promise.all([
    assert.deepStrictEqual(compute("0222112222120000", 2, 2), "0110"),
  ]);

const assert = require("assert").strict;
const { fuelRequired } = require("../src/1-2");

module.exports = () =>
  Promise.all([
    assert.strictEqual(fuelRequired(12), 2),
    assert.strictEqual(fuelRequired(14), 2),
    assert.strictEqual(fuelRequired(1_969), 966),
    assert.strictEqual(fuelRequired(100_756), 50346),
  ]);

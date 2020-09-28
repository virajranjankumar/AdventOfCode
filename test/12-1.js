const assert = require("assert").strict;
const { totalEnergyOfSystem } = require("../src/12-1");

module.exports = () =>
  Promise.all([
    assert.deepStrictEqual(
      totalEnergyOfSystem(`<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`),
      179
    ),
  ]);

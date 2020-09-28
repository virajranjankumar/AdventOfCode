const assert = require("assert").strict;
const { compute } = require("../src/6-2");

module.exports = () =>
  Promise.all([
    assert.deepStrictEqual(
      compute(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`),
      4
    ),
  ]);

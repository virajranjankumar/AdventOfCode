const assert = require("assert").strict;
const fs = require("fs");

const parseWire = (w) => ({
  values: w
    .replace(/R|U/gi, "")
    .replace(/L|D/gi, "-")
    .split(",")
    .map((i) => parseInt(i)),
  directions: w.split(",").map((i) => i.charAt(0)),
});

const convertToCoordinates = (wire) => {
  let [x, y] = [0, 0];
  const { values, directions } = parseWire(wire);
  const wireDirections = new Set(
    directions.flatMap((direction, index) => {
      const result = [];
      const rawValue = values[index];
      const sign = Math.sign(rawValue);
      if (direction === "R" || direction === "L") {
        let value = x + rawValue;
        while (x != value) {
          x += sign;
          result.push(`${x},${y}`);
        }
      } else {
        let value = y + rawValue;
        while (y != value) {
          y += sign;
          result.push(`${x},${y}`);
        }
      }
      return result;
    })
  );
  return wireDirections;
};

const compute = (wire1, wire2) => {
  const coordinates1 = convertToCoordinates(wire1);
  const coordinates2 = convertToCoordinates(wire2);
  let intersection = new Set(
    [...coordinates1].filter((a) => coordinates2.has(a))
  );

  let min = Infinity;
  intersection.forEach((i) => {
    const [x, y] = i.split(",").map((i) => Math.abs(parseInt(i)));
    min = Math.min(x + y, min);
  });

  return min;
};

assert.deepStrictEqual(compute("R8,U5,L5,D3", "U7,R6,D4,L4"), 6);
assert.deepStrictEqual(
  compute(
    "R75,D30,R83,U83,L12,D49,R71,U7,L72",
    "U62,R66,U55,R34,D71,R55,D58,R83"
  ),
  159
);
assert.deepStrictEqual(
  compute(
    "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
    "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"
  ),
  135
);

function main(inputFile = "./input/day3.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const [wire1, wire2] = text.split("\n");
  const result = compute(wire1, wire2);
  return result;
}

console.log(main());
// Answer: 1519

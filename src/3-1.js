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

function main(inputFile = "./input/day3.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const [wire1, wire2] = text.split("\n");
  const result = compute(wire1, wire2);
  return result;
}

module.exports = { compute, main };

// Answer: 1519

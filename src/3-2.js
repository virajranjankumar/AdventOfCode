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
  const wireDirections = directions.flatMap((direction, index) => {
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
  });
  return wireDirections;
};

const shortestSignalDelay = (wire1, wire2) => {
  const coordinates1 = convertToCoordinates(wire1);
  const coordinates2 = convertToCoordinates(wire2);
  const s2 = new Set(coordinates2);
  let intersection = new Set([...coordinates1].filter((a) => s2.has(a)));

  let min = Infinity;
  intersection.forEach((xy) => {
    const index1 = coordinates1.findIndex((e) => e === xy) + 1;
    const index2 = coordinates2.findIndex((e) => e === xy) + 1;
    min = Math.min(index1 + index2, min);
  });
  return min;
};

function main(inputFile = "./input/day3.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const [wire1, wire2] = text.split("\n");
  const result = shortestSignalDelay(wire1, wire2);
  return result;
}

module.exports = { shortestSignalDelay, main };
// Answer: 14358

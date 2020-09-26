const assert = require("assert").strict;
const fs = require("fs");

const add = (i, j) => i + j;
const mul = (i, j) => i * j;

const opcodes = { 1: add, 2: mul };

const computeSingleLine = ([code, i1, i2, o1], output) => {
  const operation = opcodes[code];
  output[o1] = operation(output[i1], output[i2]);
  return output;
};

const compute = (instructions = []) => {
  let i = 0;
  let [code] = instructions;
  let output = instructions;
  while (code !== 99 && i < instructions.length) {
    const singleLine = instructions.slice(i, i + 4);
    output = computeSingleLine(singleLine, output);
    i += 4;
    code = instructions[i];
  }
  return output;
};

assert.deepStrictEqual(compute([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]);
assert.deepStrictEqual(compute([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99]);
assert.deepStrictEqual(compute([2, 4, 4, 5, 99, 0]), [2, 4, 4, 5, 99, 9801]);
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
]);
assert.deepStrictEqual(compute([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]), [
  3500,
  9,
  10,
  70,
  2,
  3,
  11,
  0,
  99,
  30,
  40,
  50,
]);

async function computer(inputFile = "./input/day2.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const arr = text.split(",").map((i) => parseInt(i));
  const result = compute(arr);
  return result[0];
}

computer().then(console.log);
// Answer: 4930687

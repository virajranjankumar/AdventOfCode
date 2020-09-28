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

async function main(inputFile = "./input/day2.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const arr = text.split(",").map((i) => parseInt(i));
  const result = compute(arr);
  return result[0];
}

module.exports = { compute, main };
// Answer: 4930687

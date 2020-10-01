const fs = require("fs");

const add = (i, j) => i + j;
const mul = (i, j) => i * j;
const HALT = 99;

const opcodes = [null, add, mul];

// Pickup a single operation based on the code
// Run the operation and re-write the memory
// @return the memory array
const computeSingleLine = ([code, i1, i2, o1], output) => {
  const operation = opcodes[code];
  output[o1] = operation(output[i1], output[i2]);
  return output;
};

// Iterate through all instructions until HALT is encountered
// Compute each instruction and update the output memeory
const compute = (instructions = []) => {
  let i = 0;
  let [code] = instructions;
  let output = instructions;
  while (code !== HALT && i < instructions.length) {
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
  const program = arr;
  program[1] = 12;
  program[2] = 2;
  const result = compute(program);
  return result[0];
}

module.exports = { compute, main };
// Answer: 4930687

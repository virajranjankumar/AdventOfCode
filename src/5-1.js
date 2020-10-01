const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const convertToDigits = (v) => {
  console.log(v);
  const val = v.toString().padStart(5, "0");
  const output = [];
  for (var j = 0; j < val.length; j++) {
    output.push(+val.charAt(j));
  }
  return output;
};

const add = (i, j) => i + j;
const mul = (i, j) => i * j;
const inp = () => readline.prompt();
const out = (i) => console.log(i);

const opcodes = [null, add, mul, inp, out];

const positionMode = (i, mem) => mem[i];
const immediateMode = (i, _mem) => i;
const parameterModes = [positionMode, immediateMode];

const computeSingleLine = ([codeAndMode, i1, i2, o1], output) => {
  console.log(codeAndMode);
  const [a, b, c, _d, code] = convertToDigits(codeAndMode);
  const operation = opcodes[code];
  const input1 = parameterModes[c](i1, output);
  const input2 = parameterModes[b](i2, output);
  output[parameterModes[a](o1, output)] = operation(input1, input2);
  return output;
};

// what diagnostic code does the program instructions produce?
const compute = (instructions = []) => {
  let address = 0;
  let [code] = instructions;
  let output = instructions;
  while (code !== 99 || address < instructions.length) {
    const singleInstruction = instructions.slice(address, address + 5);
    output = computeSingleLine(singleInstruction, output);
    address += 5;
    code = instructions[address];
  }
  return output;
};

async function main(inputFile = "./input/day5.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const program = text.split(",").map((i) => parseInt(i));
  const result = compute(program);
  return result[0];
}

module.exports = { compute, main };
// Answer: 5335

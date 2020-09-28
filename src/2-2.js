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
  let address = 0;
  let [code] = instructions;
  let output = instructions;
  while (code !== 99 && address < instructions.length) {
    const singleInstruction = instructions.slice(address, address + 4);
    output = computeSingleLine(singleInstruction, output);
    address += 4;
    code = instructions[address];
  }
  return output;
};

function* generateNounVerbCombinations(program, noun, verb) {
  const nouns = [...Array(noun).keys()];
  const verbs = [...Array(verb).keys()];
  const output = program;

  for (const n of nouns) {
    for (const v of verbs) {
      output[1] = n;
      output[2] = v;
      yield output;
    }
  }
}

async function main(inputFile = "./input/day2.txt", ans = 19690720) {
  const text = fs.readFileSync(inputFile, "utf-8");
  const program = text.split(",").map((i) => parseInt(i));
  for (const p of generateNounVerbCombinations(program, 100, 100)) {
    const [result, noun, verb] = compute([...p]);
    if (result === ans) {
      return 100 * noun + verb;
    }
  }
  console.log("No Soution Found");
}

module.exports = { main };
// Answer: 5335

const fs = require("fs");
const readline = require("readline");

const fuelRequired = (mass) => Math.floor(mass / 3) - 2;

async function totalFuel(inputFile = "./input/day1.txt") {
  const fileStream = fs.createReadStream(inputFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let total = 0;

  for await (const line of rl) {
    const mass = parseInt(line);
    total += fuelRequired(mass);
  }

  return total;
}

module.exports = { fuelRequired, main: totalFuel };
// Answer: 3457281

const fs = require("fs");
const readline = require("readline");

/**
 * fuel = (⌊mass⌋ / 3) - 2
 * @param {number} mass The mass to be moved
 * @returns {number} fuel to move the mass
 */
const fuelRequired = (mass) => Math.floor(mass / 3) - 2;

/**
 *
 * @param {string} inputFile List of modules with their mass
 * @returns {number} sum of all fuel required
 */
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

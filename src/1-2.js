const fs = require("fs");
const readline = require("readline");
const baseFuelRequired = require("./1-1").fuelRequired;

/**
 * Calculate fuel required for the mass of the module and the fuel mass.
 *
 * @param {number} mass Module mass
 * @returns {number} Fuel required for mass and the additional fuel
 */
const fuelRequired = (mass) => {
  let totalFuel = baseFuelRequired(mass);
  let fuelWeight = baseFuelRequired(totalFuel);

  while (fuelWeight > 0) {
    totalFuel += fuelWeight;
    fuelWeight = baseFuelRequired(fuelWeight);
  }
  return totalFuel;
};

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
// Answer: 5183030

const assert = require('assert').strict
const fs = require('fs')
const readline = require('readline')
const baseFuelRequired = require('./day1-1').fuelRequired

const fuelRequired = (mass) => {
  let totalFuel = baseFuelRequired(mass)
  let fuelWeight = baseFuelRequired(totalFuel)
  
  while (fuelWeight > 0) {
    totalFuel += fuelWeight
    fuelWeight = baseFuelRequired(fuelWeight)
  }
  return totalFuel
}

assert.strictEqual(fuelRequired(12), 2)
assert.strictEqual(fuelRequired(14), 2)
assert.strictEqual(fuelRequired(1_969), 966)
assert.strictEqual(fuelRequired(100_756), 50346)


async function totalFuel(inputFile = './input/day1.txt') {
  const fileStream = fs.createReadStream(inputFile)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  let total = 0

  for await (const line of rl) {
    const mass = parseInt(line)
    total += fuelRequired(mass)
  }

  return total;
}

module.exports = {fuelRequired, totalFuel}
// Answer: 5183030
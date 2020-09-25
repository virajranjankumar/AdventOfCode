const assert = require('assert').strict
const fs = require('fs')
const readline = require('readline')

const fuelRequired = (mass) =>
  Math.floor(mass / 3) - 2

assert.strictEqual(fuelRequired(12), 2)
assert.strictEqual(fuelRequired(14), 2)
assert.strictEqual(fuelRequired(1_969), 654)
assert.strictEqual(fuelRequired(100_756), 33583)

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

  console.log(total);
}

totalFuel()

// Answer: 3457281
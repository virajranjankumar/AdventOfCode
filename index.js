const totalFuelDay1 = require('./day1-1').totalFuel
const totalFuelDay2 = require('./day1-2').totalFuel

async function main() {
    const day1 = await totalFuelDay1()
    console.log('Day 1-1: ', day1)

    const day2 = await totalFuelDay2()
    console.log('Day 1-2: ', day2)
}

main()
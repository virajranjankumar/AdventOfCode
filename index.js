const run = async (day, part) => {
  try {
    const { main } = require(`./src/${day}-${part}.js`);
    const result = await main();
    console.log(`[RESULT]: Day ${day} part ${part}`, result);
  } catch (e) {
    console.log(e);
    console.log(`[FAILED]: Day ${day} part ${part}`);
  }
};

const main = async () => {
  Promise.all([
    run(1, 1),
    run(1, 2),
    run(2, 1),
    run(2, 2),
    run(3, 1),
    run(3, 2),
    run(4, 1),
    run(6, 1),
    run(6, 2),
    run(8, 1),
    run(8, 2),
    run(12, 1),
  ]).then(() => {
    console.log("DONE");
  });
};

main();

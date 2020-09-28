const runTestFor = async (day, part) => {
  try {
    const tests = require(`./${day}-${part}.js`);
    await tests();
  } catch (e) {
    console.log(e);
    console.log(`[FAILED]: Day ${day} part ${part}`);
    return false;
  }
  return true;
};

(async () => {
  Promise.all([
    runTestFor(1, 1),
    runTestFor(1, 2),
    runTestFor(2, 1),
    runTestFor(3, 1),
    runTestFor(3, 2),
    runTestFor(6, 1),
    runTestFor(6, 2),
    runTestFor(8, 2),
    runTestFor(12, 1),
    runTestFor(12, 2),
  ]).then((results) => {
    if (results.every((i) => i)) {
      console.log("All Tests Passed!!");
    } else {
      console.log("Tests Failed");
    }
  });
})();

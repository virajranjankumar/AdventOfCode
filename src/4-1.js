const convertToDigits = (v) => {
  const val = v.toString();
  const output = [];
  for (var j = 0; j < 6; j++) {
    output.push(+val.charAt(j));
  }
  return output;
};

// Going from left to right, the digits never decrease
const nonDecreasing = (start, end) => {
  let output = [];
  for (let i = start; i < end; i++) {
    const digits = convertToDigits(i);
    if (isNonDecreasing(digits)) {
      output.push(digits);
    }
  }
  return output;
};

const isNonDecreasing = ([a, b, c, d, e, f]) =>
  a <= b && b <= c && c <= d && d <= e && e <= f;

// Two adjacent digits are the same
const hasAtLeastOneConsecutivePair = ([a, b, c, d, e, f]) =>
  a === b || b === c || c === d || d === e || e === f;

// How many different passwords within the range meet these criteria?
const main = (start = 137683, end = 596253) =>
  nonDecreasing(start, end).filter(hasAtLeastOneConsecutivePair).length;

module.exports = { main };

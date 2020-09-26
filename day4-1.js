const [start, end] = [137683, 596253];
const range = end - start;

const convertToDigits = (v) => {
  const val = v.toString();
  const output = [];
  for (var j = 0; j < 6; j++) {
    output.push(+val.charAt(j));
  }
  return output;
};

const nonDecreasing = () => {
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

const hasAtLeastOneConsecutivePair = ([a, b, c, d, e, f]) =>
  a === b || b === c || c === d || d === e || e === f;

const main = () => nonDecreasing().filter(hasAtLeastOneConsecutivePair).length;

console.log(main());
// Answer: 1864

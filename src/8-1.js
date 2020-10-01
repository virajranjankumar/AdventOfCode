const fs = require("fs");

const getLayers = (line, width, height) => {
  const layerLength = width * height;
  const layers = new Array(Math.round(line.length / layerLength));
  for (let i = 0; i < layers.length; i++) {
    const start = i * layerLength;
    layers[i] = line.slice(start, start + layerLength);
  }
  return layers;
};

const indexOfSmallest = (a) => a.indexOf(Math.min.apply(Math, a));

// what is the number of 1 digits multiplied by the number of 2 digits?
// given a line of pixel values
const compute = (line, width, height) => {
  const layers = getLayers(line, width, height);

  const lengths = layers.map((layer) => (layer.match(/0/g) || []).length);
  const smallestIndex = indexOfSmallest(lengths);
  const layer = layers[smallestIndex];
  const ones = (layer.match(/1/g) || []).length;
  const twos = (layer.match(/2/g) || []).length;
  return ones * twos;
};

function main(inputFile = "./input/day8.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  return compute(text, 25, 6);
}

module.exports = { compute, main };
// Answer: 1320

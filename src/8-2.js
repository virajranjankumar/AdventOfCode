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

const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
};

// What message is produced after decoding the image?
const compute = (line, width, height) => {
  const layers = getLayers(line, width, height).map((l) => l.split(""));
  return zip(...layers)
    .map((pixels) => {
      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];
        if (pixel != "2") return pixel;
      }
    })
    .join("");
};

function main(inputFile = "./input/day8.txt") {
  const [width, height] = [25, 6];
  const text = fs.readFileSync(inputFile, "utf-8");
  const result = compute(text, width, height);

  const layers = new Array(height);
  for (let i = 0; i < height; i++) {
    const start = i * width;
    layers[i] = result.slice(start, start + width).replace(/0/gi, " ");
  }
  return layers;
}

module.exports = { compute, main };
// Answer: RCYKR

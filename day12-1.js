const assert = require("assert").strict;
const fs = require("fs");
const { endianness } = require("os");

const totalEnergyOfSystem = (text, steps = 10) => {
  const positions = text.split("\n");
  const re = /^<x=(-?\d*), y=(-?\d*), z=(-?\d*)>$/i;
  let moons = positions.map((p, i) => {
    const [_p, x, y, z] = p.match(re);
    return {
      id: i,
      position: { x: parseInt(x), y: parseInt(y), z: parseInt(z) },
      velocity: { x: 0, y: 0, z: 0 },
    };
  });
  for (let t = 0; t < steps; t++) {
    moons = timeStep(moons);
  }
  const energy = moons.map(calculateEnergy).reduce((a, b) => a + b, 0);
  return energy;
};

const applyVelocities = (moon) => {
  const {
    position: { x: px, y: py, z: pz },
    velocity: { x: vx, y: vy, z: vz },
  } = moon;

  return {
    ...moon,
    position: { x: px + vx, y: py + vy, z: pz + vz },
  };
};

const applyGravity = (pairs) =>
  pairs.map(([a, b]) => {
    for (const pos of ["x", "y", "z"]) {
      a.velocity[pos] += Math.sign(b.position[pos] - a.position[pos]);
      b.velocity[pos] += Math.sign(a.position[pos] - b.position[pos]);
    }
    return [a, b];
  });

const calculateEnergy = ({ position, velocity }) => {
  const addUp = (obj) =>
    Object.values(obj)
      .map((i) => Math.abs(i))
      .reduce((a, b) => a + b, 0);

  const potential = addUp(position);
  const kinetic = addUp(velocity);
  return potential * kinetic;
};

const timeStep = (moons) => {
  const pairs = moons.flatMap((v, i) => moons.slice(i + 1).map((w) => [v, w]));
  const gravity = applyGravity(pairs).flatMap((i) => i);
  const velocity = gravity.map(applyVelocities);
  const result = Array.from(moons.keys()).map((i) =>
    velocity.find(({ id }) => id === i)
  );
  return result;
};

assert.deepStrictEqual(
  totalEnergyOfSystem(`<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`),
  179
);

function main(inputFile = "./input/day12.txt") {
  const text = fs.readFileSync(inputFile, "utf-8").trim();
  return totalEnergyOfSystem(text, 1000);
}

console.log(main());
// Answer: 8287

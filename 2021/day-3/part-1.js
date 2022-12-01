// submarine
//
const data = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

// gama rate, epsilon rate
// consumption = gama * epsilon

// 5 bits, 7 bits
// (down)

// Disagnostic report (puzzle input)
// First parameter: power consumption

// First 2 binary numbers in the diagnostic report to generate two new numbers
// called the gama rate and the epsilon rate.
//
// The power consumption can then be found by multiplying the gama rate by the
// epsilon rate.

const formattedData = data.reduce((acc, val) => {
  let mutatedAcc = {};

  for (let i = 0; i < val.length; i++) {
    const row = (acc[i] || []) + val[i];
    mutatedAcc[i] = row;
  }

  return mutatedAcc;
}, {});

console.log("formattedData", formattedData);

const gamma = Object.keys(formattedData).map((key) => {
  const binary = formattedData[key];
  const zerosCount = binary.match(/0/g).length;
  const onesCOunt = binary.match(/1/g).length;

  return zerosCount > onesCOunt ? "0" : "1";
}).join("");




console.log("gama", gamma);
console.log("gama rate", parseInt(gamma, 2));

const epsilon = gamma.split("")
  .map((val) => val === "0" ? "1" : "0")
  .join("");
console.log("epsilon", epsilon);
console.log("epsilon rate", parseInt(epsilon, 2));

const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log("powerConsumption", powerConsumption);
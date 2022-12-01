const { processedData } = require('./data');

const seedData = processedData[0][1];

let forDays = 18;

let result = [...seedData];

for(let i = 0; i < forDays; i++) {
  const count = result.filter(x => x === 0).length;
  result = [
    ...result.map((n) => n === 0 ? 6 : n - 1),
    ...Array(count).fill(8)
  ];
  // console.log(`After ${i + 1}: ${JSON.stringify(result)}`);
}

console.log("count", result.length);

function add(accumulator, a) {
  return accumulator + a;
}

// return number of spawned fish
function lanternFish(daysOld, daysLeft) {
  
}

console.log(
  "result",
  seedData
    .map((n) => n)
    .reduce(add, 0)
);


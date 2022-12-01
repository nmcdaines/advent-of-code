const { processedData } = require('./data');

function add(accumulator, a) {
  return accumulator + a;
}

const seedData = processedData[0][1];

let forDays = 256;
let result = Array(9).fill(0);

for(let i = 0; i < 9; i++) {
  result[i] = seedData.filter(x => x === i).length
}

for(let i = 0; i < forDays; i++) {
  let count = (result.splice(0,1))[0] || 0;
  result[6] += count;
  result.push(count);
}

console.log("count", result.reduce(add, 0));

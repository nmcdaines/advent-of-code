const { processedData } = require('./data');

const seedData = processedData[0][1];

let forDays = 80;

const start = new Date();

const result = Array(forDays)
  .fill(0)
  .reduce((acc, val, index) => {
    const count = acc.filter(x => x === 0).length;

    const res = [
      ...acc.map((n) => n === 0 ? 6 : n - 1),
      ...Array(count).fill(8)
    ]

    // console.log(`After ${index + 1}: ${JSON.stringify(res)}`);

    return res;
  }, [...seedData]);

console.log("count", result.length);

const end = new Date();

console.log(end - start);
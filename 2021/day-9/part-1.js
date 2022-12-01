
const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

const data = input
  .split('\n')
  .filter(str => str != "")
  .map(str => str.split("").map(Number));

let lowPoints = [];

for(let y = 0; y < data.length; y++) {
  for(let x = 0; x < data[y].length; x++) {
    const t = data[y-1] && data[y-1][x] || 9;
    const b = data[y+1] && data[y+1][x] || 9;
    const l = data[y][x-1] || 9;
    const r = data[y][x+1] || 9;

    const current = data[y][x];
    
    if (current < t && current < b && current < l && current < r) {
      lowPoints.push(current);
    }
  }
}

console.log(lowPoints);

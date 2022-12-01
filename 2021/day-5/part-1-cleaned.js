const { cordPairs } = require('./data');

const maxCords = cordPairs.reduce((acc, val) => {
  return {
    x: Math.max(acc.x, val[0][0], val[1][0]),
    y: Math.max(acc.y, val[0][1], val[1][1]),
  }
}, { x: 0, y: 0 });

const initBoard = () => (
  Array(maxCords.y + 1)
    .fill(0)
    .map(
      () => {
        return Array(maxCords.x + 1).fill(0);
      }
  )
)

const board = initBoard();

const minMax = (a,b) => {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  
  return {
    start,
    end,
    distance: end - start,
  }
}

const minMax = (a, b) => ({
  start: Math.min(a, b),
  end: Math.max(a, b)
})

cordPairs.forEach((cordPair) => {
  const [[x1, y1], [x2, y2]] = cordPair;
  console.log(`${x1},${y1} -> ${x2},${y2}`);

  if (x1 === x2) {
    const { start, end, distance } = minMax(y1, y2);

    const distance = end - start;
    console.log(`distance: ${distance}`);

    for (let i = 0; i <= distance; i++) {
      board[start + i][x1] = board[start + i][x1] + 1;
    }

  } else if (y1 === y2) {
    const { start, end, distance } = minMax(x1, x2);
    for (let i = 0; i <= distance; i++) {
      board[y1][start + i] = board[y1][start + i] + 1;
    }
  }
});

console.log(
  board
    .map(row => row.map(cell => cell > 0 ? cell : '.').join(''))
    .join('\n')
);

const numberOfTwos = board.reduce((acc, val) => {
  return acc + val.reduce((acc, val) => {
    return acc + (val >= 2 ? 1 : 0);
  }, 0);
}, 0);

console.log("number of twos: ", numberOfTwos);

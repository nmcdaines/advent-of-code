const { cordPairs } = require('./data');

const maxCords = cordPairs.reduce((acc, val) => {
  return {
    x: Math.max(acc.x, val[0][0], val[1][0]),
    y: Math.max(acc.y, val[0][1], val[1][1]),
  }
}, { x: 0, y: 0 });

function initBoard() {
  return Array(maxCords.y + 1).fill(0).map(
    () => {
      return Array(maxCords.x + 1).fill(0);
    }
  );
}

const board = initBoard();

cordPairs.forEach((cordPair) => {
  const [[x1, y1], [x2, y2]] = cordPair;

  if (x1 === x2) {
    const start = Math.min(y1, y2);
    const end = Math.max(y1, y2);

    const distance = end - start;
    console.log(`distance: ${distance}`);

    for (let i = 0; i <= distance; i++) {
      board[start + i][x1] = board[start + i][x1] + 1;
    }

  } else if (y1 === y2) {
    const start = Math.min(x1, x2);
    const end = Math.max(x1, x2);

    const distance = end - start;

    for (let i = 0; i <= distance; i++) {
      board[y1][start + i] = board[y1][start + i] + 1;
    }
  } else {
    console.log(`${x1},${y1} -> ${x2},${y2}`);

    let topToBottom = y1 < y2;
    let leftToRight = x1 < x2;

    let length = Math.min(
      (Math.max(x1, x2) - Math.min(x1, x2)),
      (Math.max(y1, y2) - Math.min(y1, y2))
    )

    for (let i = 0; i <= length; i++) {

      let yPos = topToBottom ? y1 + i : y1 - i;
      let xPos = leftToRight ? x1 + i : x1 - i;

      board[yPos][xPos] = board[yPos][xPos] + 1;
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

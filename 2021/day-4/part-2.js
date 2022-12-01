const { bingoNumbers, boards } = require('./data');

function add(accumulator, a) {
  return accumulator + a;
}


const markedBoards = Object.keys(boards).reduce((acc, boardId) => {
  return {
    ...acc,
    [boardId]: [
      Array(5).fill(0),
      Array(5).fill(0),
      Array(5).fill(0),
      Array(5).fill(0),
      Array(5).fill(0),
    ],
  }
}, {});

const markedBoards2 = Object.keys(boards).reduce((acc, boardId) => {
  return {
    ...acc,
    [boardId]: [
      Array(5).fill(0),
      Array(5).fill(0),
      Array(5).fill(0),
      Array(5).fill(0),
      Array(5).fill(0),
    ],
  }
}, {});

const foundBoards = [];
let announcedNumber = -1;

const checkBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const foundCount = row.reduce(add, 0);
    if (foundCount === 5) {
      return true;
    }
  }

  return false;
};

for (let i = 0; i < bingoNumbers.length; i++) {
  
  if (foundBoards.length >= Object.keys(boards).length) {
    break;
  }
  
  announcedNumber = bingoNumbers[i];

  Object.keys(boards).forEach(boardId => {
    const currentBoard = boards[boardId];
    currentBoard.forEach((row, rowIndex) => {
      const foundItemIndex = row.indexOf(announcedNumber);
      
      if (foundItemIndex > -1) {
        markedBoards[boardId][rowIndex][foundItemIndex] = 1;
        markedBoards2[boardId][foundItemIndex][rowIndex] = 1;
        

        if (
          checkBoard(markedBoards[boardId]) ||
          checkBoard(markedBoards2[boardId])
        ) {

          if (!foundBoards.includes(boardId)) {
            foundBoards.push(boardId);
          }
        }
      }
    });
  });
}

// console.log("markedBoards", markedBoards);
console.log("foundBoards", foundBoards);

const winningBoardId = foundBoards[foundBoards.length -1];
const winningBoard = boards[winningBoardId];
const winningMarkedBoard = markedBoards[winningBoardId];

console.log(winningBoard, winningMarkedBoard);

const sumOfUnmarked = winningMarkedBoard.reduce((acc, row, rowIndex) => {
  const winningValues = row.map((cell, cellIndex) => {
    return cell === 0
      ? winningBoard[rowIndex][cellIndex]
      : 0;
  });

  return acc + winningValues.reduce(add, 0);
}, 0);

console.log("sumOfUnmarked", sumOfUnmarked);
console.log("announcedNumber", announcedNumber);
console.log("score", sumOfUnmarked * announcedNumber);

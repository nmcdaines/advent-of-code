// horizontal position and depth = 0
// 

const intialState = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

let hpos = 0;
let dpos = 0;

intialState.forEach((line) => {
  const [direction, distance] = line.split(" ");
  if (direction === "forward") {
    hpos += Number(distance);
  }
  if (direction === "down") {
    dpos += Number(distance);
  }
  if (direction === "up") {
    dpos -= Number(distance);
  }
})

let res = hpos * dpos;

console.log(hpos, dpos, res);

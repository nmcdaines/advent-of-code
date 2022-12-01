function add(accumulator, a) {
  return accumulator + a;
}

const input = "16,1,2,0,4,2,7,1,2,14";
const inputArray = input.split(",").map(Number);

const max = Math.max(...inputArray);

const summary = inputArray.reduce((acc, val) => {
  return {
    ...acc,
    [val]: (acc[val] || 0) + 1
  }
}, {});

const usage = Object.keys(summary)
  .reduce((acc, position) => {
    const crabsCount = summary[position];
    return {
      ...acc,
      [position]: Array(max).fill(0).map((_, newPosition) => {

        return (
          Array(Math.abs(newPosition - position))
            .fill(0)
            .map((_, index) => index + 1).reduce(add, 0)
        ) * crabsCount
      })
    }
  }, {});

const minDistance = Array(max).fill(0).reduce((minimum, _, attackPosition) => {
  const distance = Object.keys(usage).map((position) => usage[position][attackPosition]).reduce(add, 0);
  return distance < minimum ? distance : minimum;
}, Infinity);

console.log("minimum distance", minDistance)

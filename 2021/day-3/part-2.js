// Life support rating = oxygen rating * CO2 scrubber rating

// Bit criteria?
// - oxygen = 

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


const zeroesCountFn = (str) => (str.match(/0/g) || []).length;
const onesCountFn = (str) => (str.match(/1/g) || []).length;

const getStartingValue = (char, strings) => {
  return strings.filter(str => str[0] === char);
}

// const filterResult = (char, sequence, strings) => {
//   const values = strings.map(str => str[sequence]).join("");
//   console.log(values);
//   const zeroesCount = zeroesCountFn(values);
//   const onesCount = onesCountFn(values);

//   return strings.filter(str => {
//     let validChar = "";

//     if (zeroesCount > onesCount) {
//       validChar = "0";
//     }

//     if (zeroesCount < onesCount) {
//       validChar = "1";
//     }

//     if (zeroesCount === onesCount) {
//       validChar = char;
//     }

//     return str[sequence] === validChar;
//   });
// }

const filterResult = (char, isGreater, sequence, strings) => {
  const values = strings.map(str => str[sequence]).join("");
  const zeroesCount = zeroesCountFn(values);
  const onesCount = onesCountFn(values);

  return strings.filter(str => {
    let validChar = "";

    if (
      isGreater && zeroesCount > onesCount ||
      !isGreater && zeroesCount < onesCount
    ) {
      validChar = "0";
    }

    if (
      isGreater && zeroesCount < onesCount ||
      !isGreater && zeroesCount > onesCount
    ) {
      validChar = "1";
    }

    if (zeroesCount === onesCount) {
      validChar = char;
    }

    return str[sequence] === validChar;
  });
}

let oxygenItems = [...data];
for (let i = 0; i < data.length; i++) {
  if (oxygenItems.length > 1) {
    // oxygenItems = filterResult("1", i, oxygenItems);
    oxygenItems = filterResult("1", true, i, oxygenItems);
  }
}

const oxygen = parseInt(oxygenItems, 2);

let co2Items = [...data];
for (let i = 0; i < data.length; i++) {
  console.log(co2Items)
  if (co2Items.length > 1) {
    // co2Items = filterResult("0", i, co2Items);
    co2Items = filterResult("0", false, i, co2Items);
  }
}


const co2 = parseInt(co2Items, 2);


console.log("oxygenItems", oxygenItems);
console.log("oxygen", oxygen);

console.log("co2Items", co2Items);
console.log("co2", co2);

console.log("life support rating", oxygen * co2);
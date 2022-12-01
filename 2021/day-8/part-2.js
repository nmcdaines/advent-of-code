const input = `
dac abcf ac fdbcga dgcbae gcbfde fgcbd agfed adcgf cdbgfea | cbfa bcafdg cbfa bafcgd
abfgd baedc feb fgde fbagcd facbdge agcbfe bgafde fe ebdfa | bef fe dgfe feb
`;

const data = input
  .replace(/\|\n/g, "| ")
  .split('\n')
  .filter(str => str != "")
  .map((str) => {
    const [signalPattern, output] = str.split(' | ');
    return {
      signalPattern,
      output
    }
  });

function difference(arr1, arr2) {
  return [...new Set(
    arr1
      .filter(x => !arr2.includes(x))
      .concat(arr2.filter(x => !arr1.includes(x)))
  )]

}

const findPattern = ({ signalPattern }) => {
  const segments = signalPattern.split(' ');

  const one = Array.from(segments.find(str => str.length === 2));
  const four = Array.from(segments.find(str => str.length === 4));
  const seven = Array.from(segments.find(str => str.length === 3));
  const eight = Array.from(segments.find(str => str.length === 7));

  const a = difference(one, seven);
  const b_d = difference(one, four);
  const e_g = difference([...four, ...a], eight);
  
  const _6 = segments
    .filter(str => str.length === 6)
    .map(str => str.split(''));
  
  const c_d_e = _6.reduce((acc, arr) => {
    const remainder = difference(arr, eight)
    return [
      ...acc,
      ...(remainder.length === 1 ? remainder : [])
    ]
  }, []);

  const d = c_d_e.filter(str => b_d.includes(str));
  const b = difference(b_d, d);
  const e = c_d_e.filter(str => e_g.includes(str));
  const c = difference(c_d_e, [...d, ...e]);
  const g = difference(e_g, e);
  const f = difference(one, c);

  return { [a]: "a", [b]: "b", [c]: "c", [d]: "d", [e]: "e", [f]: "f", [g]: "g" }
}

function matches(input, comparator) {
  const source = "abcdefg".split('');

  const inputArr = input.split('').sort().join('');
  const comparatorArr = comparator.split('').sort().join('');

  return inputArr === comparatorArr;

  // const shouldNotMatch = source.filter(char => !comparatorArr.includes(char));

  // if (inputArr.includes(...comparatorArr) && !inputArr.includes(...shouldNotMatch)) {
  //   return true;
  // }

  // return false;
}

// console.log(matches("acdfg", "acdeg"))

function convertLettersToNumbers (letters) {
  const zero = "abcefg";
  const one = "cf";
  const two = "acdeg";
  const three = "acdfg";
  const four = "bcdf";
  const five = "abdfg";
  const six = "abdefg";
  const seven = "acf";
  const eight = "abcdefg";
  const nine = "abcdfg";

  return [zero, one, two, three, four, five, six, seven, eight, nine].reduce((acc, val, index) => {
    if (acc <= 0 && matches(letters, val)) {
      console.log(
        letters.split('').sort().join(''),
        val.split('').sort().join(''),
        index
      );

      return index;
    }
    
    return acc;
  }, -1);
}

const findResult = ({ signalPattern, output }) => {
  const signal = findPattern({ signalPattern });
  
  const decodedOutput = output
    .split(' ')
    .map((encodedInput) => {
      const decodedInput = encodedInput.split('').map(char => signal[char]).join('');
      return convertLettersToNumbers(decodedInput);
    });
    
  return decodedOutput.join('');
}

console.log(data.map(findResult));


function add(accumulator, a) {
  return accumulator + a;
}

console.log(data.map(findResult).map(Number).reduce(add, 0));
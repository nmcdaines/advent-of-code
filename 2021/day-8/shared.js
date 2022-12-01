/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/


function renderLine(numbers = []) {
  const segments = numbers.map(val => renderSegment(val));


  return Array(7).fill(0).map((_, lineIndex) => {
    return segments.reduce((line, character) => {
      return `${line}${characterSpacer}${character[lineIndex]}`
    }, "");
  });
}

const characterSpacer = "  ";
const spacer = "    ";

function renderSegment(number) {
  const a = [0,  2,3,  5,6,7,8,9].includes(number);
  const b = [0,      4,5,6,  8,9].includes(number);
  const c = [0,1,2,3,4,    7,8,9].includes(number);
  const d = [    2,3,4,5,6,  8,9].includes(number);
  const e = [0,  2,      6,  8].includes(number);
  const f = [0,1,  3,4,5,6,7,8,9].includes(number);
  const g = [0,  2,3,  5,6,  8,9].includes(number);

  return [
    ` ${a ? "aaaa" : "...."} `,
    `${b ? "b" : "."}${spacer}${c ? "c" : "."}`,
    `${b ? "b" : "."}${spacer}${c ? "c" : "."}`,
    ` ${d ? "dddd" : "...."} `,
    `${e ? "e" : "."}${spacer}${f ? "f" : "."}`,
    `${e ? "e" : "."}${spacer}${f ? "f" : "."}`,
    ` ${g ? "gggg" : "...."} `,
  ];
}

function print(value) {
  value.forEach(element => {
    console.log(element);
  });
}

print(renderLine([0, 1, 2, 3]));
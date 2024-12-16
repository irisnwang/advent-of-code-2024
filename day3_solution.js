const fs = require('fs');

const rawData = fs.readFileSync('day3_input.txt').toString();
let regex = /mul\([0-9]*,[0-9]*\)+|do\(\)|don't\(\)/g;
// let regex = /do\(\)|don't\(\)+/g;

let array;

let answer = 0;

let exec = true

while ((array = regex.exec(rawData)) !== null) {
    console.log(array[0]);

    if (array[0] === 'do()') {
        exec = true;
    } else if (array[0] === "don't()") {
        exec = false;
    } else {
        if (exec) {

            answer += multiply(array[0]);
        }
    }
}

function multiply(s) {
    const things = s.split(',');
    const left = /(\d+)$/.exec(things[0])[0];
    const right = /[0-9]*/g.exec(things[1])[0];
    // console.log(left, right)
    return left * right;
}

console.log(answer)

const fs = require('fs');

const rawData = fs.readFileSync('day7_test.txt').toString();
const dataRows = rawData.split('\n');

// Ugh just begin with t/f
function evaluatesToAnswer(answer, operands) {
    let first = operands[0];
    let rest = operands.slice(1);
    let result = multiply(answer, rest, first) || add(answer, rest, first) || concatenate(answer, rest, first);


    return result
}

function multiply(answer, operands, acc) {
    if (!operands.length) {
        return acc === answer
    }

    let first = operands[0];
    let rest = operands.slice(1);

    acc = acc * first;

    return multiply(answer, rest, acc) || add(answer, rest, acc)

}

function add(answer, operands, acc) {
    if (!operands.length) {
        return acc === answer
    }

    let first = operands[0];
    let rest = operands.slice(1);

    acc = acc + first;

    return multiply(answer, rest, acc) || add(answer, rest, acc);

}

// for each row parse into answer
// Parse, check, and return true if there's a good way to do it
function validateRow(input) {
    const answer = parseInt(input.split(': ')[0]);

    const operandsString = input.split(': ')[1];

    const operands = operandsString.split(' ').map(x => parseInt(x));

    const valid = evaluatesToAnswer(answer, operands);

    return valid ? answer : 0;
}

let result = 0;

for (row of dataRows) {
    result += validateRow(row)
}

console.log(result)

// 11387
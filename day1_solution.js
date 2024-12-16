const fs = require('fs');

const rawData = fs.readFileSync('day1_input.txt').toString();

const dataRows = rawData.split('\n');
console.log(dataRows[0])
const left = [];
const right = [];

for (const row of dataRows) {
    const pair = row.split('   ');
    left.push(pair[0]);
    right.push(pair[1]);
}

left.sort();
right.sort();

let answer = 0;

function occurences(num) {
    const startIndex = right.findIndex(x => x === num);
    let endIndex = startIndex;
    while (right[endIndex] === num) {
        endIndex++;
    }

    return endIndex - startIndex;
}

for (let i = 0; i < left.length; i++) {
    answer += left[i] * occurences(left[i]);
}

console.log(answer);
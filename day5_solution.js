const fs = require('fs');

const rawData = fs.readFileSync('day5_input.txt').toString();
const dataRows = rawData.split('\n');

const constraints = new Map();

for (let i = 0; i < 1176; i++) {
    const row = dataRows[i];
    const pair = row.split('|')

    insertConstraint(pair[0], pair[1]);
}

function insertConstraint(first, second) {
    if (constraints.has(first)) {
        constraints.get(first).push(second)
    } else {
        constraints.set(first, [second])
    }
}

let answer = 0;

let answerPart2 = 0;

for (let i = 1177; i < dataRows.length; i++) {
    const list = dataRows[i].split(',');

    const sortedList = [...list];

    sortedList.sort(comparisonFn);

    if (list.every((first, idx) => first === sortedList[idx])) {
        answer += parseInt(getMiddle(list));
    } else {
        answerPart2 += parseInt(getMiddle(sortedList))
    }
}

function getMiddle(list) {
    // 5 => 2
    return list[Math.floor(list.length / 2)]
}

function comparisonFn(first, second) {
    if (constraints.has(first) && constraints.get(first).includes(second)) {
        return -1;
    }
    if (constraints.has(second) && constraints.get(second).includes(first)) {
        return 1;
    }

    return 0;
}


console.log(answerPart2)
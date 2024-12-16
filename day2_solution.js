const fs = require('fs');

const rawData = fs.readFileSync('day2_input.txt').toString();

const dataRows = rawData.split('\n');

const reports = dataRows.map(row => row.split(' '));

let answer = 0;

for (const report of reports) {
    if (validReport(report)) {
        answer++
    }
}

console.log(answer)

function validReport(report) {
    const diffs = []
    for (let i = 1; i < report.length; i++) {
        diffs.push(report[i] - report[i - 1]);
    }

    if (allPositive(diffs) || allNegative(diffs)) {
        return true;
    } else {
        const pos = squashPositive(diffs)
        const neg = squashNegative(diffs)

        const valid = allPositive(pos[0]) || allPositive(pos[1]) || allNegative(neg[0]) || allNegative(neg[1]);

        return valid;
        // const wawa = bruteForce(report);
        //
        // if (!valid && wawa) {
        //     console.log("BEGIN")
        //     console.log("Diffs: ", diffs)
        //     console.log("SP: ", squashPositive(diffs))
        //     console.log("SN: ", squashNegative(diffs))
        //
        //     console.log("END")
        // }

        // return bruteForce(report);
    }
}

function bruteForce(report) {
    for (let i = 0; i < report.length; i++) {
        if (validReport2(report.toSpliced(i, 1))) {return true}
    }

    return false;
}

function validReport2(report) {
    const diffs = []
    for (let i = 1; i < report.length; i++) {
        diffs.push(report[i] - report[i - 1]);
    }

    return !!(allPositive(diffs) || allNegative(diffs));
}

function squashPositive(diffs) {
    const newDiffs = [];
    let flag = false;

    let rulebreakerIdx = -1;

    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] < 1 || diffs[i] > 3) {
            rulebreakerIdx = i;
        }
    }

    // return squash left, squash right
    let squashLeft = [...diffs];
    if (rulebreakerIdx === 0) {
        squashLeft = squashLeft.slice(1);
    } else {
        squashLeft[rulebreakerIdx - 1] = squashLeft[rulebreakerIdx - 1] + squashLeft[rulebreakerIdx];
        squashLeft.splice(rulebreakerIdx, 1);
    }

    // return squash left, squash right
    let squashRight = [...diffs];
    if (rulebreakerIdx === diffs.length - 1) {
        squashRight.pop();
    } else {
        squashRight[rulebreakerIdx] = squashRight[rulebreakerIdx] + squashRight[rulebreakerIdx + 1];
        squashRight.splice(rulebreakerIdx + 1, 1);
    }


    return [squashLeft, squashRight];
}

function squashNegative(diffs) {
    const newDiffs = [];
    let flag = false;

    let rulebreakerIdx = -1;

    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] > -1 || diffs[i] < -3) {
            rulebreakerIdx = i;
        }
    }

    // return squash left, squash right
    let squashLeft = [...diffs];
    if (rulebreakerIdx === 0) {
        squashLeft = squashLeft.slice(1);
    } else {
        squashLeft[rulebreakerIdx - 1] = squashLeft[rulebreakerIdx - 1] + squashLeft[rulebreakerIdx];
        squashLeft.splice(rulebreakerIdx, 1);
    }

    // return squash left, squash right
    let squashRight = [...diffs];
    if (rulebreakerIdx === diffs.length - 1) {
        squashRight.pop();
    } else {
        squashRight[rulebreakerIdx] = squashRight[rulebreakerIdx] + squashRight[rulebreakerIdx + 1];
        squashRight.splice(rulebreakerIdx + 1, 1);
    }


    return [squashLeft, squashRight];
}
//
// function squashNegative(diffs) {
//     const newDiffs = [];
//     let flag = false;
//     for (let i = 0; i < diffs.length; i++) {
//         if (diffs[i] > -1 || diffs[i] < -3) {
//             if (flag) {
//                 return [1];
//             }
//             flag = true;
//
//             if (i === 0) {
//                 return diffs.slice(1);
//             }
//
//             if (i === diffs.length - 1) {
//                 return newDiffs;
//             }
//
//             newDiffs.push(diffs[i] + (diffs[i + 1] ?? 0));
//             i++;
//         } else  {
//             newDiffs.push(diffs[i]);
//         }
//     }
//
//     return newDiffs
// }

function allPositive(diffs) {
    return diffs.every(number => number >= 1 && number <= 3)
}

function allNegative(diffs) {
    return diffs.every(x => x <= -1 && x >= -3)
}

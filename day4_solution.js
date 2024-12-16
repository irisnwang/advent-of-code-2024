const fs = require('fs');

const rawData = fs.readFileSync('day4_input.txt').toString();
const dataRows = rawData.split('\n');
const height = dataRows.length;
const width = dataRows[0].length;
let regexXmas = /XMAS/g;
let regexSamx = /SAMX/g;

// Count rows
const rowCounts = rawData.match(regexXmas).length + rawData.match(regexSamx).length;

// Rotate array


const rotatedArray = [];
for (let i = 0; i < width; i++) {
    const newString = [];
    for (let j = 0; j < height; j++) {
        newString.push(dataRows[j].charAt(i));
    }
    rotatedArray.push(newString.join(''));
}

const rotatedString = rotatedArray.join('\n');
const colCounts = rotatedString.match(regexXmas).length + rotatedString.match(regexSamx).length;

// Get array diagonals
// I think get all NW starting points
// Then for each starting point travel southeast until not in array
const startingPointsNW = [];
for (let i = width - 4; i >= 0; i--) {
    startingPointsNW.push([i, 0]);
}
for (let i = 1; i < height - 3; i++) {
    startingPointsNW.push([0, i]);
}

const diagonalArray = [];
// generate strings
for (let start of startingPointsNW) {
    let rowNumber = start[1];
    let charIdx = start[0];
    const diagonalString = [];
    while (dataRows[rowNumber]?.charAt(charIdx)) {
        diagonalString.push(dataRows[rowNumber].charAt(charIdx));
        rowNumber++;
        charIdx++;
    }
    diagonalArray.push(diagonalString.join(''))
}
const nwDiagonal = diagonalArray.join('\n');

// Get array diagonals
// I think get all NE starting points
// Then for each starting point travel southwest until not in array
const startingPointsNE = [];
for (let i = 3; i < width; i++) {
    startingPointsNE.push([i, 0]);
}
for (let i = 1; i < height - 3; i++) {
    startingPointsNE.push([width - 1, i]);
}

const diagonalArray2 = [];

for (let start of startingPointsNE) {
    let rowNumber = start[1];
    let charIdx = start[0];
    const diagonalString = [];
    while (dataRows[rowNumber]?.charAt(charIdx)) {
        diagonalString.push(dataRows[rowNumber].charAt(charIdx));
        rowNumber++;
        charIdx--;
    }
    diagonalArray2.push(diagonalString.join(''))
}

const neDiagonal = diagonalArray2.join('\n');

const diagonalCounts = neDiagonal.match(regexXmas).length + neDiagonal.match(regexSamx).length + nwDiagonal.match(regexXmas).length + nwDiagonal.match(regexSamx).length;

// console.log(diagonalCounts + rowCounts + colCounts);

// for each A we can check if the northeast diagonal is a SAM/MAS and northwest diagonal

function nwMas(row, charIdx) {
    // \
    const diagonal = (dataRows[row + 1]?.charAt(charIdx + 1) ?? '') + 'A' + (dataRows[row - 1]?.charAt(charIdx - 1) ?? '');
    return diagonal === 'MAS' || diagonal === 'SAM';
}

function neMas(row, charIdx) {
    // \
    const diagonal = (dataRows[row - 1]?.charAt(charIdx + 1) ?? '') + 'A' + (dataRows[row + 1]?.charAt(charIdx - 1) ?? '');
    return diagonal === 'MAS' || diagonal === 'SAM';
}

function isXmas(row, charIdx) {
    if (dataRows[row].charAt(charIdx) === 'A' && nwMas(row, charIdx) && neMas(row, charIdx)) {
        answer++;
    }
}

let answer = 0;

for (let row = 0; row < height; row++) {
    for (let charIdx = 0; charIdx < width; charIdx++) {
        isXmas(row, charIdx);
    }
}

console.log(answer)
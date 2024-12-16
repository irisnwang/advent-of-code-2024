const fs = require('fs');

const rawData = fs.readFileSync('day6_test.txt').toString();
const dataRows = rawData.split('\n');

const map = dataRows.map(row => row.split(''));

// map[row][column] (INVERTED X Y AXIS!!!);

// Find starting location


// Move forward until we hit the end
// N, E, S, W
let currentDirection = 'N';

let currentPosition = [];

let start;

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === '^') {
            currentPosition = [row, col]
            start = [row, col]
            console.log(currentPosition)
        }
    }
}

const visited = new Set();

const directionalVisited = new Set();

function rotate() {
    switch (currentDirection) {
        case "N":
            currentDirection = 'E';
            break;
        case "E":
            currentDirection = 'S';
            break;
        case "S":
            currentDirection = 'W';
            break;
        case "W":
            currentDirection = 'N';
            break;
    }
}

function next(x, y) {
    switch (currentDirection) {
        case "N":
            return [x - 1, y];
        case "E":
            return [x, y + 1];
        case "S":
            return [x + 1, y];
        case "W":
            return [x, y - 1];
    }
}

function isEnd(x, y) {
    // If it's undefined, return true
    return !(map[x] && map[x][y])
}

function isObstructed(x, y) {
    // If it's undefined, return true
    return map[x][y] === '#';
}

let keepGoing = true;

while (keepGoing) {
    step()
}

console.log(visited.size)

function step() {
    visited.add(JSON.stringify(currentPosition));

    const nextPosition = next(...currentPosition);

    if (isEnd(...nextPosition)) {
        keepGoing = false;
        return;
    }

    if (isObstructed(...nextPosition)) {
        rotate();
        return;
    }

    currentPosition = nextPosition;

}

// for each visited, add a #
let mapCopy = structuredClone(map);
// mapCopy[6][3] = '#';

currentPosition = start;

keepGoing = true;

while (keepGoing) {
    console.log("PreStep: ", JSON.stringify([...currentPosition, currentDirection]))

    step()
    if (directionalVisited.has(JSON.stringify([...currentPosition, currentDirection]))) {
        console.log("loop!!!")
        break;
    }
    directionalVisited.add(JSON.stringify([...currentPosition, currentDirection]));

    console.log("PostStep: ", JSON.stringify([...currentPosition, currentDirection]))
}


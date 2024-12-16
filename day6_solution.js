const fs = require('fs');

const rawData = fs.readFileSync('day6_input.txt').toString();
const dataRows = rawData.split('\n');

const map = dataRows.map(row => row.split(''));
let mapCopy = structuredClone(map);

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
    return !(mapCopy[x] && mapCopy[x][y])
}

function isObstructed(x, y) {
    // If it's undefined, return true
    return mapCopy[x][y] === '#';
}

let keepGoing = true;

while (keepGoing) {
    step()
}

console.log(visited.size)

const originalVisited = structuredClone(visited);

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

let safeLocations = 0;
let counter = 0;

// for each visited, add a #
for (let visit of originalVisited) {
    counter++;
    // Reset search
    let loopFound = false;
    mapCopy = structuredClone(map);
    const x = JSON.parse(visit)[0];
    const y = JSON.parse(visit)[1];
    mapCopy[x][y] = '#';

    directionalVisited.clear();

    currentPosition = start;
    currentDirection = 'N';

    keepGoing = true;

    while (keepGoing) {
        if (directionalVisited.has(JSON.stringify([...currentPosition, currentDirection]))) {
            loopFound = true;

            if (x === 95) {
                console.log(visit)
            }
            break;
        }
    
        directionalVisited.add(JSON.stringify([...currentPosition, currentDirection]));
    
        step()
    }

    if (loopFound && (x != start[0] || y != start[1])) {
        safeLocations++;
    }

}

console.log(safeLocations)

const { input } = require('./input');
// const { input } = require('./temp');
const {sum} = require('lodash')

const forest = input.split('\n').map(r => r.split('').map(x => +x));

const sol = [];

const minRow = 0;
const maxRow = forest.length;
const minCol = 0;
const maxCol = forest[0].length;

let maxViewScore = 0;

for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
        const score = checkTree(row,col);
        if (maxViewScore < score) {
            maxViewScore = score
        }
    }
}

function checkTree(row, col) {
    const val = forest[row][col]
    // check above
    let checkAbove = row - 1;
    let vdA = 0;
    while (checkAbove >= minRow) {
        vdA++;
        if (forest[checkAbove][col] >= val) {
            break;
        }
        checkAbove--;
    }

    // check above
    let checkBelow = row + 1;
    let vdB = 0;
    while (checkBelow < maxRow) {
        vdB++;
        if (forest[checkBelow][col] >= val) {
            break;
        }
        checkBelow++;
    }

    // check above
    let checkLeft = col - 1;
    let vdL = 0;
    while (checkLeft >= minCol) {
        vdL++;
        if (forest[row][checkLeft] >= val) {
            break;
        }
        checkLeft--;
    }

    // check above
    let checkRight = col + 1;
    let vdR = 0;
    while (checkRight < maxCol) {
        vdR++;
        if (forest[row][checkRight] >= val) {
            break;
        }
        checkRight++;
    }

    return vdA * vdB * vdL * vdR;
}

console.log(maxViewScore)
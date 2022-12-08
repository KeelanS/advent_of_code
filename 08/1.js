const { input } = require('./input');
// const { input } = require('./temp');
const {sum} = require('lodash')

const forest = input.split('\n').map(r => r.split(''));

const sol = [];

// go over rows
for (let i = 0; i < forest.length; i++) {
    sol.push(new Set());

    let leftHighest = -1;
    // go left to right
    for (let j = 0; j < forest[i].length; j++) {
        const val = +forest[i][j]
        if (leftHighest < val) {
            sol[i].add(j);
            leftHighest = val;
        }
    }

    let rightHighest = -1
    // go right to left
    for (let j = forest[i].length-1; j >= 0; j--) {
        const val = +forest[i][j]
        if (rightHighest < val) {
            sol[i].add(j);
            rightHighest = val;
        }
    }
}

// go over columns
for (let column = 0; column < forest[0].length; column++) {

    let topHighest = -1;
    // go top to bottom
    for (let row = 0; row < forest.length; row++) {
        const val = +forest[row][column];
        if (topHighest < val) {
            sol[row].add(column);
            topHighest = val;
        }
    }

    let bottomHighest = -1
    // go bottom to top
    for (let row = forest[column].length-1; row >= 0; row--) {
        const val = +forest[row][column];
        if (bottomHighest < val) {
            sol[row].add(column);
            bottomHighest = val;
        }
    }
}

console.log(sum(sol.map(x => x.size)))
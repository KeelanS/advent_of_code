const { input } = require('./input');
// const { input } = require('./temp');
const { sum } = require('lodash');

const rounds = input.split('\n').map(round => round.split(' '));

const abc = "ABC";
const xyz = "XYZ";

const getScore = (opponent, you) => {
    const o = abc.indexOf(opponent) + 1;
    const y = xyz.indexOf(you) + 1;

    if (y == 2) {
        return o + 3;
    }

    // I tried to find something clever but it's sunday and my brain is lagging
    switch (opponent) {
        case 'A':
            return y == 1 ? 3 : 8;
        case 'B':
            return y == 1 ? 1 : 9;
        case 'C':
            return y == 1 ? 2 : 7;
    }    
}

console.log(sum(rounds.map(round => getScore(round[0], round[1]))))
const { input } = require('./input');
const { sum } = require('lodash');

const rounds = input.split('\n').map(round => round.split(' '));

const abc = "ABC";
const xyz = "XYZ";

const getScore = (opponent, you) => {
    const o = abc.indexOf(opponent) + 1;
    const y = xyz.indexOf(you) + 1;

    if (o == y) {
        return y + 3;
    }

    
    return xyz.charAt(o%3) == you ? y + 6 : y;
}

console.log(sum(rounds.map(round => getScore(round[0], round[1]))))
const { input } = require('./input');
const { sum } = require('lodash')

const elves = input.split("\n\n").map(elve => elve.split("\n").map(cal => +cal));

const totals = elves.map(elve => sum(elve));

console.log(sum(totals.sort((a, b) => b - a).slice(0, 3)));

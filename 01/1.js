const { input } = require('./input');
const { sum, max } = require('lodash');

const elves = input.split("\n\n").map(elve => elve.split("\n").map(cal => +cal));

const totals = elves.map(elve => sum(elve));

console.log(max(totals))
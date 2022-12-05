const { input } = require('./input');
// const { input } = require('./temp');
const { range, intersection } = require('lodash')

const pairs = input.split('\n').map(pair => pair.split(',').map(elve => elve.split('-')).map(e => [...range(+e[0], +e[1] + 1)]));

const overlapping = pairs.filter(p => intersection(p[0], p[1])?.length);


console.log(overlapping.length);
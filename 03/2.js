const { input } = require('./input');
// const { input } = require('./temp');
const {sum, intersection} = require('lodash')

const prio = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rucksacks = input.split('\n');

let result = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
    const rs = rucksacks.slice(i, i + 3).map(r => r.split(''));

    const inter = intersection(...rs)
    
    result += prio.indexOf(inter) + 1;
}

console.log(result)
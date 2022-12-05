const { input } = require('./input');
// const { input } = require('./temp');
const {sum} = require('lodash')

const prio = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rucksacks = input.split('\n').map(rucksack => [rucksack.substring(0, rucksack.length / 2), rucksack.substring(rucksack.length / 2)]);

const dups = rucksacks.map(rucksack => {
    const dup = rucksack[0].match(RegExp(`[${rucksack[1]}]`));

    if (dup) {
        return prio.indexOf(dup[0]) + 1;
    }
})

console.log(sum(dups))
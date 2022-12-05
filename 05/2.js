const { input } = require('./input');
// const { input } = require('./temp');

const [stacksString, commandsString] = input.split('\n\n');

const crates = createCrates();
const commands = commandsString.split('\n').map(l => l.split(' ').filter(w => w.match(/^[0-9]*$/)));

commands.forEach(([amount, from, to]) => doMoves(amount, from, to));

function doMoves(amount, from, to) {
    const toBeMoved = crates[from].slice(-(+amount));
    crates[from] = crates[from].slice(0, -(+amount));
    crates[to].push(...toBeMoved);
}

console.log(crates.map(l => l[l.length - 1]).join(''))


// Helper functions

function createCrates() {
    const stacks = stacksString.split('\n').map(r => r.split(''));
    const stackNumbers = stacks.pop();
    stacks.reverse();

    const result = [];

    stackNumbers.map((v, i) => {
        if (v != ' ') {
            result[v] = stacks.map(s => s[i]).filter(sv => sv != ' ');
        }
    });

    return result;
}
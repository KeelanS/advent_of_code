const { input } = require('./input');
// const { input } = require('./temp');
const { sum } = require('lodash');


const blocks = input.split('\n$ ls\n').map(b => b.split('\n'))
let nextDir = '/'
const dirMap = new Map();

for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].filter(b => !b.match(/^\$/))
    dirMap.set(nextDir, block);
    const cmds = blocks[i].filter(b => b.match(/^\$/))
    for (let cmd of cmds) {
        if (cmd.match(/\$ cd [^\.]+/)) {
            nextDir = nextDir + cmd.split(' ')[2] + '/'
        } else {
            nextDir = nextDir.split('/').slice(0, nextDir.split('/').length-2).join('/') + '/';
        }
    }
}

const solMap = new Map();

for (let key of dirMap.keys()) {
    if (!solMap.get(key)) {
        solMap.set(key, findSize(key))
    }
}

function findSize(key) {
    const solVal = solMap.get(key);
    if (solVal) {
        return solVal;
    }

    let result = 0;
    for (let l of dirMap.get(key)) {
        if (l.match(/^[0-9].*/)) {
            result += +l.split(' ')[0];
        } else {
            const dir = key + l.split(' ')[1] + '/';
            const dirSize = findSize(dir);
            solMap.set(dir,  dirSize);
            result += dirSize;
        }
    }
    
    solMap.set(key, result);
    return result;
}

console.log(sum([...solMap.values()].filter(v => v <= 100000)))

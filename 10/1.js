const { input } = require('./input');
// const { input } = require('./temp');

const commands = input.split('\n').map(x => x.split(' '));

const result = [1];
let prev = 1;

for (let command of commands) {
    if (command == 'noop') {
        result.push(prev);
    } else {
        result.push(prev, prev);
        const amount = +command[1];
        prev += amount;
    }
}

 
let signalStrength = 0 
for (const i of [20,60,100,140,180,220]) {
    signalStrength += i * result[i]
}
console.log(signalStrength)
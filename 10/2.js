const { input } = require('./input');
// const { input } = require('./temp');

const commands = input.split('\n').map(x => x.split(' '));

const result = [];
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

const screenRow = Array(40).fill().map(_ => '.');

const screen = Array(6).fill().map(_ => [...screenRow]);

for (let i = 0; i < result.length; i++) {
    const row = Math.floor(i / 40) % 6;
    const col = i % 40;
    const spritePos = result[i];
    if (col >= spritePos - 1 && col <= spritePos + 1) {
        screen[row][col] = '#';
    } else {
        screen[row][col] = '.'
    }
}

console.log(screen.map(x => x.join('')).join('\n'));
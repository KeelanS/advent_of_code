const { input } = require('./input');
// const { input } = require('./temp');
const { evaluate } = require('mathjs');

const monkeys = input.split('\n\n').map(x => x.split('\n')).map(x => ({
    items: x[1].split(':')[1].split(',').map(x => x.trim()),
    operation: x[2].split(':')[1].trim().split(' = ')[1],
    test: {
        test: x[3].split(':')[1].trim().split(' ')[2],
        true: x[4].split(':')[1].trim().split(' ')[3],
        false: x[5].split(':')[1].trim().split(' ')[3]
    },
    inspect: 0
}));

for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
        for (const item of monkey.items) {
            const afterInspect = inspect(item, monkey.operation);
            test(afterInspect, monkey.test.test, monkey.test.true, monkey.test.false);
            monkey.inspect++;
        }
        monkey.items = [];
    }
}


function inspect(item, operation) {
    const toBeParsed = operation.replaceAll('old', item);
    const result = evaluate(toBeParsed);
    return Math.floor(result / 3);
}

function test(item, testVal, ifTrue, ifFalse) {
    if (item % testVal == 0) {
        monkeys[ifTrue].items.push(item);
    } else {
        monkeys[ifFalse].items.push(item);
    }
}

// console.log(monkeys);

const inspected = monkeys.map(m => m.inspect).sort((a,b) => b-a)

console.log(inspected[0] * inspected[1])
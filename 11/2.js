const { input } = require('./input');
// const { input } = require('./temp');
const { evaluate, lcm } = require('mathjs');

const monkeys = input.split('\n\n').map(x => x.split('\n')).map(x => ({
    items: x[1].split(':')[1].split(',').map(x => +x.trim()),
    operation: x[2].split(':')[1].trim().split(' = ')[1],
    test: {
        test: x[3].split(':')[1].trim().split(' ')[2],
        true: x[4].split(':')[1].trim().split(' ')[3],
        false: x[5].split(':')[1].trim().split(' ')[3]
    },
    inspect: 0
}));

const common =  lcm(...monkeys.map(x => +x.test.test));

console.log(common)
for (let i = 0; i < 10000; i++) {
    for (const [index, monkey] of monkeys.entries()) {
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
    return result;
}

function test(item, testVal, ifTrue, ifFalse) {
    const modded = item % testVal;
    if (modded == 0) {
        monkeys[ifTrue].items.push(item % common);
    } else {
        monkeys[ifFalse].items.push(item % common);
    }
}

console.log(monkeys.map(x => x.inspect));

const inspected = monkeys.map(m => m.inspect).sort((a,b) => b-a)

console.log(inspected[0] * inspected[1])
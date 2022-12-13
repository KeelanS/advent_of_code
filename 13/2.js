const { input } = require('./input');
// const { input } = require('./temp');
const { isNumber, isEqual } = require('lodash');

const packets = input.split('\n\n').map(x => x.split('\n').map(x => JSON.parse(x))).flat();
const divider1 = [[2]];
const divider2 = [[6]];
packets.push(divider1, divider2);

for (let i = 0; i < packets.length; i++) {
    for (let j = 0; j < packets.length - 1 - i; j++) {
        if (!compareSides(packets[j], packets[j+1])) {
            swap(j, j+1);
        }
    }
}

function swap(a, b) {
    const temp = packets[a];
    packets[a] = packets[b];
    packets[b] = temp;
}

function compareSides(left, right) {
    for (let i = 0; i < left.length; i++) {
        if (i >= right.length) {
            return false;
        }
        const l = left[i];
        const r = right[i];
        if (isNumber(l) && isNumber(r)) {
            if (l > r) {
                return false;
            } else if (l < r) {
                return true
            }
        } else if (!isNumber(l) && !isNumber(r)) {
            const twoArrays = compareSides(l, r);
            if (twoArrays == false) {
                return false;
            } else if (twoArrays == true) {
                return true;
            }
        } else {
            const newL = isNumber(l) ? [l] : l;
            const newR = isNumber(r) ? [r] : r;
            const mixed = compareSides(newL, newR)
            if (mixed == false) {
                return false;
            } else if (mixed == true) {
                return true;
            }
        }
    }
    if (left.length < right.length) {
        return true;
    }
}

console.log((packets.findIndex(x => isEqual(x, divider1)) + 1) * (packets.findIndex(x => isEqual(x, divider2)) + 1));
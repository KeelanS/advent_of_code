const { input } = require('./input');
// const { input } = require('./temp');
const { isNumber, sum } = require('lodash');

const packets = input.split('\n\n').map(x => x.split('\n').map(x => JSON.parse(x))).map(x => ({left: x[0], right: x[1]}));

const result = [];

for (const [i, packet] of packets.entries()) {
    const compared = compareSides(packet.left, packet.right);
    if (compared) {
        result.push(i+1);
    }
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

console.log(sum(result));
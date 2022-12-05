const { input } = require('./input');
// const { input } = require('./temp');

const pairs = input.split('\n').map(pair => pair.split(',').map(elve => elve.split('-')).map(e => ({min: +e[0], max: +e[1]})));

const overlapping = pairs.filter(p => {
    const [p0, p1] = p;

    if (p1.min == p0.min || p1.max == p0.max) {
        return true;
    }
    if (p0.min < p1.min) {
        return p0.max >= p1.max;
    } else {
        return p1.max >= p0.max;
    }
})

console.log(overlapping.length);
// const { input } = require('./input');
const { input } = require('./temp');

const sensors = input.split('\n').map(x => x.split(': ').map(x => x.split(' at ')[1].split(', ').map(y => +y.split('=')[1]))).map(x => ({
    position: x[0],
    closestBeacon: x[1]
}));

let filled = new Set();

for (const sensor of sensors) {
    filled = new Set([...filled, ...createArea(sensor.position, sensor.closestBeacon, 10)]);
}

console.log(filled.size);

function createArea(sensor, beacon, row) {
    const dist = getDistance(sensor, beacon);
    const [bx, by] = sensor;
    const tempFilled = new Set();
    const yDelta = row - by;
    if (Math.abs(yDelta) <= dist) {
        const startX = bx - (dist - Math.abs(yDelta));
        const stopX = bx + (dist - Math.abs(yDelta));

        for (let i = startX; i <= stopX; i++) {
            tempFilled.add(getPointString([i, row]));
        }
    }
    tempFilled.delete(getPointString(sensor));
    tempFilled.delete(getPointString(beacon));
    return tempFilled;
}

function getDistance(p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function getPointString(p) {
    return `${p[0]}:${p[1]}`
}
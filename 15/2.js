const { input } = require('./input');
// const { input } = require('./temp');
const classifyPoint = require("robust-point-in-polygon");

class Polygon {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    get topLeft() {
        const result = [];
        const [lx, ly] = this.left;
        const tx = this.top[0];

        for (let i = 0; lx + i <= tx+1; i++) {
            result.push([lx + i - 1, ly - i]);
        }
        return result;
    }

    get topRight() {
        const result = [];
        const [rx, ry] = this.right;
        const tx = this.top[0];

        for (let i = 0; rx - i >= tx - 1; i++) {
            result.push([rx - i + 1, ry - i]);
        }
        return result;
    }

    get botLeft() {
        const result = [];
        const [lx, ly] = this.left;
        const bx = this.bottom[0];

        for (let i = 0; lx + i <= bx + 1; i++) {
            result.push([lx + i - 1, ly + i]);
        }
        return result;
    }

    get botRight() {
        const result = [];
        const [rx, ry] = this.right;
        const bx = this.bottom[0];

        for (let i = 0; rx - i >= bx - 1; i++) {
            result.push([rx - i + 1, ry + i]);
        }
        return result;
    }

    get allBordering() {
        console.log(this.top)
        return new Set([...this.topLeft, ...this.topRight, ...this.botLeft, ...this.botRight]);
    }

    includesPoint(x,y) {
        return classifyPoint([this.left,this.top,this.right,this.bottom], [x,y]) <= 0;
    }
}

const minValue = 0;
const maxValue = 4000000;

const sensors = input.split('\n').map(x => x.split(': ').map(x => x.split(' at ')[1].split(', ').map(y => +y.split('=')[1]))).map(x => ({
    position: x[0],
    closestBeacon: x[1]
})).map(sensor => {
    const dist = getDistance(sensor.position, sensor.closestBeacon);
    const [x,y] = sensor.position;
    return new Polygon([x-dist, y], [x, y-dist], [x+dist, y], [x, y+dist]);
});

const allBorderingPoints = sensors.map(x => [...x.allBordering]).flat().filter(x => x[0] >= minValue && x[0] <= maxValue && x[1] >= minValue && x[1] <= maxValue);

console.log("POINTS CREATED");

const finalBeacon = doCheck(allBorderingPoints);
console.log(finalBeacon[0] * 4000000 + finalBeacon[1]);



function doCheck(points) {    
    for (const neighbor of points) {
        if (!checkIfInAny(neighbor, minValue, maxValue)) {
            return neighbor;
        }
    }
    return false;
}

function checkIfInAny(point, minV, maxV) {
    const [x, y] = point
    if (x >= minV && x <= maxV && y >= minV && y <= maxV) {
        for (const sensor of sensors) {
            if (sensor.includesPoint(x, y)) {
                return true;
            }
        }
        return false;
    } else {
        return true;
    }
}

function getDistance(p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function getPointString(p) {
    return `${p[0]}:${p[1]}`
}
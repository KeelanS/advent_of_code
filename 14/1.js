// const { input } = require('./input');
const { input } = require('./temp');
const { min, max } = require('lodash');

const linePoints = input.split('\n').map(x => x.split(' -> ').map(point => ({x: +point.split(',')[0], y: +point.split(',')[1]}))).map(lines => getLine(lines)).flat();

const lines = new Set(linePoints.map(p => getPointString(p.x, p.y)));
const sand = new Set();

const lowest = max(linePoints.map(x => x.y));

const start = {x: 500, y: 0};
let isFalling = false;

while (!isFalling) {
    isFalling = move(start) == null;
}
console.log(sand.size)

function move(pos) {
    if (pos.y > lowest) {
        return null;
    }
    const curr = getPointString(pos.x, pos.y);
    if (lines.has(curr) || sand.has(curr)) {
        const left = getPointString(pos.x - 1, pos.y);
        if (lines.has(left) || sand.has(left)) {
            const right = getPointString(pos.x+1, pos.y);
            if (lines.has(right) || sand.has(right)) {
                return false;
            } else {
                return handleNextMove(pos.x+1, pos.y+1, right);
            }
        } else {
            return handleNextMove(pos.x-1, pos.y+1, left);
        }
    } else {
        return handleNextMove(pos.x, pos.y+1, curr);
    }
}

function handleNextMove(x,y,s) {
    const afterMove = move(createPoint(x, y));
    if (afterMove == null) {
        return null;
    }

    if (afterMove == false) {
        sand.add(s);
    }

    return true;
}

// Parsing functions
function getLine(pointList) {
    const result = [];
    for (let i = 1; i < pointList.length; i++) {
        const prev = pointList[i-1];
        const curr = pointList[i];

        const yDiff = prev.y - curr.y;

        if (yDiff == 0) {
            const xMin = min([prev.x, curr.x]);
            const xMax = max([prev.x, curr.x]);

            for (let x = xMin; x <= xMax; x++) {
                result.push({x, y: curr.y});
            }
        } else {
            const yMin = min([prev.y, curr.y]);
            const yMax = max([prev.y, curr.y]);

            for (let y = yMin; y <= yMax; y++) {
                result.push({x: curr.x, y});
            }
        }
    }
    return result;
}

function getPointString(x,y) {
    return `${x}-${y}`;
}

function createPoint(x,y) {
    return {x, y}
}
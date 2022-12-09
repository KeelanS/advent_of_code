const { input } = require('./input');
// const { input } = require('./temp');
const { sum, set } = require('lodash');

const commands = input.split('\n').map(x => x.split(' ')).map(x => [x[0], +x[1]]);

const H = {x: 0, y: 0};
const snake = new Array(9).fill().map(_ => ({x:0, y:0}));

const result = new Map();
result.set(0, new Set([0]));

for (let command of commands) {
    const [dir, dist] = command;
    switch (dir) {
        case 'R':
            for (let i = 0; i < dist; i++) {
                H.x++;
                if (getDistance(H.x, H.y, snake[0].x, snake[0].y) >= 2) {
                    moveSnake(H.x -1, H.y);
                }
            }
            break;
        case 'L':
            for (let i = 0; i < dist; i++) {
                H.x--;
                if (getDistance(H.x, H.y, snake[0].x, snake[0].y) >= 2) {
                    moveSnake(H.x + 1, H.y);
                }
            }
            break;
        case 'U':
            for (let i = 0; i < dist; i++) {
                H.y--;
                if (getDistance(H.x, H.y, snake[0].x, snake[0].y) >= 2) {
                    moveSnake(H.x, H.y + 1);
                }
            }
            break;
        case 'D':
            for (let i = 0; i < dist; i++) {
                H.y++;
                if (getDistance(H.x, H.y, snake[0].x, snake[0].y) >= 2) {
                    moveSnake(H.x, H.y - 1);
                }
            }
            break;
    }
}

function moveSnake(x, y) {
    snake[0].x = x;
    snake[0].y = y;
    for (let i = 1; i < 9; i++) {
        const prev = snake[i-1];
        const curr = snake[i];
        if (getDistance(prev.x, prev.y, curr.x, curr.y) >=2) {
            const closest = getClosest(prev, curr);
            curr.x = closest.x;
            curr.y = closest.y;
        } else {
            break;
        }
        if (i == 8) {
            if (result.get(curr.x) == undefined || result.get(curr.x) == null) {
                result.set(curr.x, new Set([curr.y]));
            } else {
                result.get(curr.x).add(curr.y);
            }
        }
    }
}

function getClosest(destination, start) {
    const deltas = [
        [-1,-1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1,-1],
        [1, 0],
        [1, 1]
    ]
    let best = 10;
    let bestDelta = null;
    for (let d of deltas) {
        const distance = getDistance(destination.x, destination.y, start.x + d[0], start.y + d[1]);
        if (distance < best) {
            bestDelta = d;
            best = distance;
        }
    }
    return {
        x: start.x + bestDelta[0],
        y: start.y + bestDelta[1]
    }
}

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

console.log(result)
console.log(sum([...result.values()].map(x => x.size)))
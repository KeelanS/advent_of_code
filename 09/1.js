const { input } = require('./input');
// const { input } = require('./temp');
const { sum, set } = require('lodash');

const commands = input.split('\n').map(x => x.split(' ')).map(x => [x[0], +x[1]]);

const H = {x: 0, y: 0};
const T = {x: 0, y: 0};

const result = new Map();
result.set(0, new Set([0]));

for (let command of commands) {
    const [dir, dist] = command;
    switch (dir) {
        case 'R':
            for (let i = 0; i < dist; i++) {
                H.x++;
                if (getDistance(H.x, H.y, T.x, T.y) >= 2) {
                    moveTail(H.x - 1, H.y);
                }
            }
            break;
        case 'L':
            for (let i = 0; i < dist; i++) {
                H.x--;
                if (getDistance(H.x, H.y, T.x, T.y) >= 2) {
                    moveTail(H.x + 1, H.y);
                }
            }
            break;
        case 'U':
            for (let i = 0; i < dist; i++) {
                H.y--;
                if (getDistance(H.x, H.y, T.x, T.y) >= 2) {
                    moveTail(H.x, H.y + 1);
                }
            }
            break;
        case 'D':
            for (let i = 0; i < dist; i++) {
                H.y++;
                if (getDistance(H.x, H.y, T.x, T.y) >= 2) {
                    moveTail(H.x, H.y - 1);
                }
            }
            break;
    }

}

function moveTail(x,y) {
    T.x = x;
    T.y = y;

    if (result.get(x) == undefined || result.get(x) == null) {
        result.set(x, new Set([y]));
    } else {
        result.get(x).add(y);
    }
}

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

// console.log(result.values())
console.log(sum([...result.values()].map(x => x.size)))
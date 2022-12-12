const { input } = require('./input');
// const { input } = require('./temp');

const elevation = "abcdefghijklmnopqrstuvwxyz".split('');
const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];

const area = input.split('\n').map(x => x.split(''));
const start = [area.findIndex(x => x.includes('E')), area[area.findIndex(x => x.includes('E'))].indexOf('E')];

const maxRow = area.length - 1;
const maxCol = area[0].length - 1;

const neighbours = area.map((row, i) => row.map((_, j) => ({pos: `${i}-${j}`, neighbours: getNeighbors(i,j)})))

const res = bfs();
console.log(res);
console.log(res.length - 1);

function bfs() {
    let queue = [[start, []]];
    let visited = new Set();

    while (queue.length > 0) {
        let [curr, [...path]] = queue.shift();
        const currNode = getNode(curr);
        path.push(currNode.pos);

        if (getChar(curr) == 'a') {
            return path;
        }

        for (const node of currNode.neighbours) {
            const pos = getNode(node).pos;
            if (!visited.has(pos)) {
                queue.push([node, path]);
                visited.add(pos)
            }
        }
        visited.add(currNode.pos);
    }
}

function getNeighbors(x,y) {
    const result = [];
    const val = getElevation(area[x][y]);
    for (const dir of dirs) {
        const nextX = x + dir[0];
        const nextY = y + dir[1];
        if (nextX >= 0 && nextX <= maxRow && nextY >= 0 && nextY <= maxCol) {
            const nextVal = getElevation(area[nextX][nextY]);
            const delta = nextVal-val;
            if (delta >= -1) {
                result.push([nextX, nextY])
            }
        }
    }
    return result
}

function getNode(coord) {
    return neighbours[coord[0]][coord[1]];
}

function getChar(coord) {
    return area[coord[0]][coord[1]];
}

function getElevation(char) {
    if (char == 'S') {
        return 0;
    }
    if (char == 'E') {
        return 25;
    }
    return elevation.indexOf(char);
}

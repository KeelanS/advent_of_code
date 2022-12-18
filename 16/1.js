const { input } = require('./input');
// const { input } = require('./temp');
const { isEqual } = require('lodash');

const regex = /Valve (?<room>[A-Z]*) has flow rate=(?<flowRate>[0-9]*); tunnels? leads? to valves? (?<valves>.*)$/
const rooms = input.split('\n').map(x => x.match(regex).groups).reduce((map, room) => map.set(room.room, {flowRate: +room.flowRate, valves: room.valves.split(', ')}), new Map());

const maxTime = 30;
const relevantRooms = [...rooms.keys()].filter(x => rooms.get(x).flowRate > 0);

const distMap = new Map();

let bestPressure = 0;

getAAReach();

buildDistMap();

doStep('AA', 0, 0, 0, []);
console.log(bestPressure)

function doStep(currRoom, flowDelta, totalPressure, currentMinute, visitedRooms) {
    if (currentMinute >= maxTime) {
        bestPressure = bestPressure > totalPressure ? bestPressure : totalPressure;
        return;
    }
    if (visitedRooms.length === relevantRooms.length) {
        const finalPressure = totalPressure + (flowDelta * (maxTime - currentMinute));
        bestPressure = bestPressure > finalPressure ? bestPressure : finalPressure;
        return;
    }

    // add distToMyRoom, distToElephantRoom en replace one that is lowest adapt other with time gone by

    for (const room of distMap.get(currRoom).keys()) {
        if (visitedRooms.indexOf(room) < 0) {
            const nextVisisted = [...visitedRooms, room]
            const time = distMap.get(currRoom).get(room) + 1
            const checkedTime = currentMinute + time > maxTime ? maxTime - currentMinute : time;
            const nextFlow = flowDelta + rooms.get(room).flowRate;
            const nextPressure = totalPressure + (flowDelta * checkedTime);
            const nextMinute = currentMinute + checkedTime;
            doStep(room, nextFlow, nextPressure, nextMinute, nextVisisted);
        }
    }
}


// Helper functions

function buildDistMap() {
    for (const fromRoom of relevantRooms) {
        const result = new Map();
        for (const toRoom of relevantRooms) {
            if (fromRoom != toRoom) {
                result.set(toRoom, bfs(fromRoom, toRoom));
            }
        }
        distMap.set(fromRoom, result);
    }
}

function getAAReach() {
    const result = new Map();
    for (const toRoom of relevantRooms) {
        if ('AA' !== toRoom) {
            result.set(toRoom, bfs('AA', toRoom));
        }
    }
    distMap.set('AA', result);
}

function bfs(start, finish) {
    let queue = [[start, []]];
    let visited = new Set();

    while (queue.length > 0) {
        let [curr, [...path]] = queue.shift();
        const currRoom = rooms.get(curr);
        path.push(curr);

        if (curr === finish) {
            return path.length - 1;
        }

        for (const room of currRoom.valves) {
            if (!visited.has(room)) {
                queue.push([room, path]);
                visited.add(room)
            }
        }
        visited.add(curr);
    }
}

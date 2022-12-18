// const { input } = require('./input');
const { input } = require('./temp');
const { isEqual } = require('lodash');

const regex = /Valve (?<room>[A-Z]*) has flow rate=(?<flowRate>[0-9]*); tunnels? leads? to valves? (?<valves>.*)$/
const rooms = input.split('\n').map(x => x.match(regex).groups).reduce((map, room) => map.set(room.room, {flowRate: +room.flowRate, valves: room.valves.split(', ')}), new Map());

const maxTime = 26;
const relevantRooms = [...rooms.keys()].filter(x => rooms.get(x).flowRate > 0);

const distMap = new Map();

let bestPressure = 0;

getAAReach();

buildDistMap();

doStep('AA', 'AA', 0, 0, 0, 0, 0, []);
console.log(bestPressure)

function doStep(currRoom, elephantRoom, currDist, elephantDist, flowDelta, totalPressure, currentMinute, visitedRooms) {
    if (currentMinute >= maxTime) {
        bestPressure = bestPressure > totalPressure ? bestPressure : totalPressure;
        return;
    }
    if (visitedRooms.length === relevantRooms.length) {
        let finalPressure;
        if (currDist === elephantDist) {
            finalPressure = totalPressure + (flowDelta * (maxTime - currentMinute));
        } else if (currDist < elephantDist) {
            const nextFlow = flowDelta + rooms.get(elephantRoom).flowRate;
            finalPressure = totalPressure + (flowDelta * (elephantDist - currDist)) + (nextFlow * (maxTime - currentMinute + elephantDist - currDist));
        } else {
            const nextFlow = flowDelta + rooms.get(currRoom).flowRate;
            finalPressure = totalPressure + (flowDelta * (currDist - elephantDist)) + (nextFlow * (maxTime - currentMinute + currDist - elephantDist));
        }

        bestPressure = bestPressure > finalPressure ? bestPressure : finalPressure;
        return;
    }

    // add distToMyRoom, distToElephantRoom en replace one that is lowest adapt other with time gone by

    if (currDist === elephantDist) {
        for (const room of distMap.get(currRoom).keys()) {
            if (!visitedRooms.includes(room)) {
                const nextVisisted = [...visitedRooms, room];
                const time = distMap.get(currRoom).get(room) + 1;
                const checkedTime = currentMinute + time > maxTime ? maxTime - currentMinute : time;
                const flow = rooms.get(room).flowRate;
                for (const eRoom of distMap.get(elephantRoom).keys()) {
                    if (!nextVisisted.includes(eRoom)) {
                        nextVisisted.push(eRoom);
                        const eTime = distMap.get(elephantRoom).get(eRoom) + 1;
                        const eCheckedTime = currentMinute + eTime > maxTime ? maxTime - currentMinute : eTime;
                        const eFlow = rooms.get(eRoom).flowRate;
                        let { nextFlow, nextPressure, nextMinute } = getNextValues(checkedTime, eCheckedTime, flow, eFlow);
                        doStep(room, eRoom, checkedTime, eCheckedTime, nextFlow, nextPressure, nextMinute, nextVisisted);
                    }
                }
            }
        }
    } else if (currDist < elephantDist) {
        const eTime = elephantDist - currDist;
        const eFlow = rooms.get(elephantRoom).flowRate;
        for (const room of distMap.get(currRoom).keys()) {
            if (!visitedRooms.includes(room)) {
                const nextVisisted = [...visitedRooms, room];
                const time = distMap.get(currRoom).get(room) + 1;
                const checkedTime = currentMinute + time > maxTime ? maxTime - currentMinute : time;
                const flow = rooms.get(room).flowRate;
                let { nextFlow, nextPressure, nextMinute } = getNextValues(checkedTime, eTime, flow, eFlow);
                doStep(room, elephantRoom, checkedTime, eTime, nextFlow, nextPressure, nextMinute, nextVisisted);
            }
        }
    } else {
        const time = currDist - elephantDist;
        const flow = rooms.get(currRoom).flowRate;
        for (const eRoom of distMap.get(elephantRoom).keys()) {
            if (!visitedRooms.includes(eRoom)) {
                const nextVisisted = [...visitedRooms, eRoom];
                const eTime = distMap.get(elephantRoom).get(eRoom) + 1;
                const eCheckedTime = currentMinute + eTime > maxTime ? maxTime - currentMinute : eTime;
                const eFlow = rooms.get(eRoom).flowRate;
                let { nextFlow, nextPressure, nextMinute } = getNextValues(time, eCheckedTime, flow, eFlow);
                doStep(currRoom, eRoom, time, eCheckedTime, nextFlow, nextPressure, nextMinute, nextVisisted);
            }
        }
    }

    function getNextValues(checkedTime, eCheckedTime, flow, eFlow) {
        let nextFlow, nextPressure, nextMinute;
        if (checkedTime == eCheckedTime) {
            nextFlow = flowDelta + flow + eFlow;
            nextPressure = totalPressure + (flowDelta * checkedTime);
            nextMinute = currentMinute + checkedTime;
        } else if (checkedTime < eCheckedTime) {
            nextFlow = flowDelta + flow;
            nextPressure = totalPressure + (flowDelta * checkedTime);
            nextMinute = currentMinute + checkedTime;
        } else {
            nextFlow = flowDelta + eFlow;
            nextPressure = totalPressure + (flowDelta * eCheckedTime);
            nextMinute = currentMinute + eCheckedTime;
        }
        return { nextFlow, nextPressure, nextMinute };
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

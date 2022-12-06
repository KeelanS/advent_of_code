const { input } = require('./input');
// const { input } = require('./temp');

for (let i = 4; i < input.length; i++) {
    const sub = input.slice(i-4, i);

    if (!sub.match(/(.).*\1/)) {
        console.log(i);
        break;
    }
}

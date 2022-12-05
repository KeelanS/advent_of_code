const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'temp.txt'), 'utf8')
	.toString();

module.exports = {
	input,
};
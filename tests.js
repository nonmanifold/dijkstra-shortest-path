const dijkstra = require('./dijkstra');
const count = dijkstra.count;
const assert = require('assert');

assert.equal(true, count({}, 0, 0));

console.log('Pass');

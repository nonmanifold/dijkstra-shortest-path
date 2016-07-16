const dijkstra = require('./dijkstra');
const findShortestPaths = dijkstra.findShortestPaths;
const assert = require('assert');
function getGraph() {
    const verticies = [
        "1 2,1 3,4",
        "2 1,1 3,3 4,6",
        "3 2,2 1,4, 4,3",
        "4 2,6 3,3"
    ];
    var nodes = {};
    verticies.forEach(function (line) {
        dijkstra.parseLine(nodes, line, ' ');
    });
    return nodes;
}

assert.deepEqual({1: 0, 2: 1, 3: 3, 4: 6}, findShortestPaths(getGraph(), 1));

console.log('Pass');

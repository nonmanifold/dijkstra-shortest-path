const readline = require('readline');
const fs = require('fs');
const path = require('path');
const fileName = '_dcf1d02570e57d23ab526b1e33ba6f12_dijkstraData.txt';
const pathName = path.join('./', fileName);
const dijkstra = require('./dijkstra');
const addEdge = dijkstra.addEdge;
const nodes = {};
var numEdges = 0;

const rl = readline.createInterface({
    input: fs.createReadStream(pathName)
});

rl.on('line', function (line) {
    numEdges = numEdges + dijkstra.parseLine(nodes, line);
});

rl.on('close', function () {
    console.log('Attempting to count Dijkstra\'s shortest-path algorithm on graph with ' + Object.keys(nodes).length + ' nodes, and ' + numEdges + ' edges');
    setImmediate(function () {
        const endPoints = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
        const distancesForTargetVers = [];
        const distances = dijkstra.findDistances(nodes, 1);
        endPoints.forEach(function (endpoint) {
            var pathLen = distances.hasOwnProperty(endpoint) ? distances[endpoint] : 1000000;
            distancesForTargetVers.push(pathLen);
        });
        console.log('distances: ' + distancesForTargetVers.join(','));
    });
});
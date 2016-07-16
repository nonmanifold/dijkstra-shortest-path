const readline = require('readline');
const fs = require('fs');
const path = require('path');
const fileName = '_dcf1d02570e57d23ab526b1e33ba6f12_dijkstraData.txt';
const pathName = path.join('./', fileName);
const dijkstra = require('./dijkstra');
const addEdge=dijkstra.addEdge;
const nodes = {};
var numEdges = 0;

const rl = readline.createInterface({
    input: fs.createReadStream(pathName)
});

rl.on('line', function (line) {
    const row = line.split("\t");
    row.pop();
    const vLabel = parseInt(row.shift(),10);
    if(isNaN(vLabel)){
        return;
    }
    row.forEach(function (entry) {
        const vertAndLength = entry.split(',');
        const vertHead = parseInt(vertAndLength[0], 10);
        const edgeLength = parseInt(vertAndLength[1], 10);
        if (addEdge(nodes, vLabel, vertHead, edgeLength)) {
            numEdges++;
        }
    });

});

rl.on('close', function () {
    console.log('Attempting to count Dijkstra\'s shortest-path algorithm on graph with ' + Object.keys(nodes).length + ' nodes, and ' + numEdges + ' edges');
    setImmediate(function () {
        const endPoints = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
        const distancies = [];
        endPoints.forEach(function (endpoint) {
            distancies.push(dijkstra.count(nodes, 1, endpoint));
        });
        console.log('distancies:' + distancies.join(','));
    });
});
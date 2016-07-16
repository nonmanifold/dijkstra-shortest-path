function parseLine(nodes, line, separator) {
    var numEdges = 0;
    const row = line.split(separator || "\t");
    const vLabel = parseInt(row.shift(), 10);
    if (isNaN(vLabel)) {
        return;
    }
    row.forEach(function (entry) {
        if(entry==''){
            return;
        }
        const vertAndLength = entry.split(',');
        const vertHead = parseInt(vertAndLength[0], 10);
        const edgeLength = parseInt(vertAndLength[1], 10);
        if (addEdge(nodes, vLabel, vertHead, edgeLength)) {
            numEdges++;
        }
    });
    return numEdges;
}

function Vertex(neighbors) {
    this.neighbors = neighbors || [];
}
function Edge(v, length) {
    this.v = v;
    this.length = length;
}
function addEdge(nodes, v1, v2, length) {
    if (v1 === v2) {
        return false;
    }
    if (length < 0) {
        throw new Error('edge length can not be less than zero.');
    }
    if (!nodes.hasOwnProperty(v1)) {
        nodes[v1] = new Vertex(); // create vertex
    }
    nodes[v1].neighbors.push(new Edge('' + v2, length));//add edge to another node
    /*
     if (!nodes.hasOwnProperty(v2)) {
     nodes[v2] = new Vertex();//create vertex to point to
     }
     nodes[v2].neighbors.push(new Edge(v1, length));//add edge to another node
     */
    return true;
}

function findDistances(nodes, start) {
    start = '' + start;
    const processedVerts = [];
    const distances = {};
    distances[start] = 0;
    processedVerts.push(start);
    const totalVerts = Object.keys(nodes).length;
    while (processedVerts.length < totalVerts) {
        var minDistance = Number.MAX_SAFE_INTEGER;
        var vertToSuck = null;
        processedVerts.forEach(function (vLabel) {
            const edges = nodes[vLabel].neighbors;
            edges.forEach(function (edge) {
                if (processedVerts.indexOf(edge.v) < 0) {
                    // this neighboring edge crosses the frontier
                    if (edge.length + distances[vLabel] < minDistance) {
                        minDistance = edge.length + distances[vLabel];
                        vertToSuck = edge.v;
                    }
                }
            })
        });
        if (vertToSuck !== null) {
            processedVerts.push(vertToSuck);
            distances[vertToSuck] = minDistance;
        }
    }
    return distances;
}

module.exports = {
    parseLine,
    addEdge,
    findDistances
};
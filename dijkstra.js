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
    nodes[v1].neighbors.push(new Edge(v2, length));//add edge to another node

    if (!nodes.hasOwnProperty(v2)) {
        nodes[v2] = new Vertex();//create vertex to point to
    }
    nodes[v2].neighbors.push(new Edge(v1, length));//add edge to another node

    return true;
}

function count(nodes, from, to) {
    return null;
}

module.exports = {
    count,
    addEdge
};
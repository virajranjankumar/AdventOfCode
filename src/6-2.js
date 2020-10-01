const fs = require("fs");

class Queue extends Array {
  enqueue(val) {
    this.push(val);
  }

  dequeue() {
    return this.shift();
  }

  isEmpty() {
    return this.length === 0;
  }
}

class Graph {
  constructor(verticies, edges) {
    this.verticies = verticies;
    this.edges = edges;

    this.adj = {};
    for (const v of verticies) {
      this.adj[v] = new Set();
    }

    for (const [v, w] of edges) {
      this.addEdge(v, w);
    }
  }

  addEdge(v, w) {
    if (v === undefined || w === undefined) return;
    this.adj[w].add(v);
    this.adj[v].add(w);
  }

  adjacent(v) {
    return this.adj[v];
  }
}

class BreadthFirstPaths {
  constructor(graph, s) {
    this.marked = {};
    this.edgeTo = {};
    for (const v of graph.verticies) {
      this.marked[v] = false;
      this.edgeTo[v] = null;
    }
    this.s = s;
    this.bfs(graph, s);
  }

  bfs(graph, s) {
    const queue = new Queue();
    this.marked[s] = true;
    queue.enqueue(s);
    while (!queue.isEmpty()) {
      const v = queue.dequeue();

      for (const w of graph.adjacent(v)) {
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.marked[w] = true;
          queue.enqueue(w);
        }
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v];
  }

  pathTo(v) {
    if (!this.hasPathTo(v)) return null;
    const path = new Array();
    for (let x = v; x != this.s; x = this.edgeTo[x]) path.push(x);
    path.push(this.s);
    return path;
  }
}

// What is the minimum number of orbital transfers required from YOU -> SAN?
const compute = (rawMap) => {
  const pairs = rawMap.split("\n");
  const edges = pairs.map((p) => p.split(")"));
  const verticies = new Set(edges.flatMap((e) => e));
  const graph = new Graph(verticies, edges);

  const undirectedGraph = new BreadthFirstPaths(graph, "YOU");
  const path = undirectedGraph.pathTo("SAN");
  return path.length - 2 - 1;
};

function main(inputFile = "./input/day6.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const result = compute(text);
  return result;
}

module.exports = { compute, main };
// Answer 466

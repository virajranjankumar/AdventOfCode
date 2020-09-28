const fs = require("fs");

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
  }

  adjacent(v) {
    return this.adj[v];
  }
}

class DirectedDFS {
  constructor(graph, s) {
    this.marked = {};
    for (const v of graph.verticies) {
      this.marked[v] = false;
    }
    this.dfs(graph, s);
  }

  dfs(graph, v) {
    this.marked[v] = true;
    for (const w of graph.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(graph, w);
      }
    }
  }
}

const getPathLength = (graph, source) => {
  const directedGraph = new DirectedDFS(graph, source);
  return Object.values(directedGraph.marked).filter((i) => i).length - 1;
};

const compute = (rawMap) => {
  const pairs = rawMap.split("\n");
  const edges = pairs.map((p) => p.split(")"));
  const verticies = new Set(edges.flatMap((e) => e));
  const graph = new Graph(verticies, edges);

  let paths = 0;
  for (const v of verticies) {
    paths += getPathLength(graph, v);
  }
  return paths;
};

function main(inputFile = "./input/day6.txt") {
  const text = fs.readFileSync(inputFile, "utf-8");
  const result = compute(text);
  return result;
}

module.exports = { compute, main };
// Answer 312697

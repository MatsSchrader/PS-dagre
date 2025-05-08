"use strict";

let greedyFAS = require("./greedy-fas");
let uniqueId = require("./util").uniqueId;

module.exports = {
  run: run,
  undo: undo
};

function run(g, oldGraph) {
  let fas = (g.graph().acyclicer === "greedy"
    ? greedyFAS(g, weightFn(g))
    : dfsFAS(g, oldGraph));
  fas.forEach(e => {
    let label = g.edge(e);
    g.removeEdge(e);
    label.forwardName = e.name;
    label.reversed = true;
    g.setEdge(e.w, e.v, label, uniqueId("rev"));
  });

  function weightFn(g) {
    return e => {
      return g.edge(e).weight;
    };
  }
}

function dfsFAS(g, oldGraph) {
  let fas = [];
  let stack = {};
  let visited = {};

  function dfs(v) {
    if (Object.hasOwn(visited, v)) {
      return;
    }
    visited[v] = true;
    stack[v] = true;
    g.outEdges(v).forEach(e => {
      if (Object.hasOwn(stack, e.w)) {
        fas.push(e);
      } else {
        dfs(e.w);
      }
    });
    delete stack[v];
  }

  function dfsDynamic(v) {
    if (Object.hasOwn(visited, v)) {
      return;
    }
    visited[v] = true;
    stack[v] = true;
    g.outEdges(v).forEach(e => {
      if (Object.hasOwn(stack, e.w) || (oldGraph.node(v).rank > oldGraph.node(e.w).rank) && isReachedFromStartWithoutEdge(g, e.w, e)) {
        fas.push(e);
      } else {
        dfsDynamic(e.w);
      }
    });
    delete stack[v];
  }


  //TODO works well to place start outmost and keep 'intended general graph direction'
  // should be generalized to something like dfs(g.startNode) or g.sources().forEach(dfs)
  //g.nodes().forEach(dfs);
  if (oldGraph) {
    dfsDynamic('Start');
  } else {
    dfs('Start');
  }
  return fas;
}

function undo(g) {
  g.edges().forEach(e => {
    let label = g.edge(e);
    if (label.reversed) {
      g.removeEdge(e);

      let forwardName = label.forwardName;
      delete label.reversed;
      delete label.forwardName;
      g.setEdge(e.w, e.v, label, forwardName);
    }
  });
}


function isReachedFromStartWithoutEdge(g, node, ignoreEdge) {
  // reverse dfs from the given node to 'Start' without using edge e
  let visited = {};

  function reverseDfs(v) {
    if (v === 'Start') {
      return true;
    }
    visited[v] = true;
    for (let e of g.inEdges(v)){
      // do not use ignored edge
      // do not visit the same node twice
      if (!(e.v === ignoreEdge.v && e.w === ignoreEdge.w)
      && !Object.hasOwn(visited, e.v)) {
        if (reverseDfs(e.v)) {
          return true;
        }
      }
    }
    return false;
  }
  return reverseDfs(node);
}
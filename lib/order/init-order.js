"use strict";

let util = require("../util");
const crossCount = require("./cross-count");

module.exports = initOrder;

/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
function initOrder(g, oldGraph) {
  let visited = {};
  let visitedTargets = {};
  let simpleNodes = g.nodes().filter(v => !g.children(v).length);
  let simpleNodesRanks = simpleNodes.map(v => g.node(v).rank);
  let maxRank = util.applyWithChunking(Math.max, simpleNodesRanks);
  let layers = util.range(maxRank + 1).map(() => []);

  function dfs(v) {
    if (visited[v]) return;
    visited[v] = true;
    let node = g.node(v);
    layers[node.rank].push(v);
    const succs = g.successors(v).toSorted((a, b) => compareOldOrder(a, b));
    succs.forEach(dfs);
  }

  function bfs(start) {
    const queue = [start];
    while (queue.length > 0) {
      const v = queue.shift();
      if (visited[v]) continue;
      visited[v] = true;
      let node = g.node(v);
      layers[node.rank].push(v);
      const succs = g.successors(v).toSorted((a, b) => compareOldOrder(a, b));
      succs.forEach(successor => {
        if (!visited[successor]) {
          queue.push(successor);
        }
      });
    }
  }

  let orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
  orderedVs.forEach(dfs);
  // console.log('cross count DFS:', crossCount(g, layers));
  // //TODO try BFS instead of DFS
  // // in my testing always identical
  // g.sources().forEach(bfs);
  // console.log('cross count BFS:', crossCount(g, layers));
  // console.log('=======================================');

  function compareOldOrder(a, b) {
    //TODO: idea: make sure reversed link pairs are always next to each other
    // could be done before or after toSorted, since order is not changed when links have the same target
    let nodeA = g.node(a);
    let nodeB = g.node(b);
    // treat as equal if there is no oldGraph or if (a or b are not dummy nodes for edges)
    if (!oldGraph ||
      nodeA.dummy !== "edge" || nodeB.dummy !== "edge") {
      return 0;
    }

    const source = oldGraph.node(nodeA.edgeObj.v);
    const targetA = findNextTargetInOldGraph(nodeA.edgeObj.w);
    const targetB = findNextTargetInOldGraph(nodeB.edgeObj.w);
    // If either target is not found in the oldGraph, treat as equal
    if (!targetA || !targetB || !source) {
      return 0;
    }

    const layout = oldGraph.graph().rankdir.toLowerCase() || "lr"; // Default to Left-Right
    let slopeA, slopeB;
    if (layout === "lr" || layout === "rl") {
      // Left-Right or Right-Left: y-coordinate varies, x is ranks
      slopeA = (targetA.y - source.y) / (targetA.x - source.x);
      slopeB = (targetB.y - source.y) / (targetB.x - source.x);
    } else {
      // Top-Bottom or Bottom-Top: x-coordinate varies, y is ranks
      slopeA = (targetA.x - source.x) / (targetA.y - source.y);
      slopeB = (targetB.x - source.x) / (targetB.y - source.y);
    }
    // Lower coordinate gets lower order (comes first)
    const slopeDiff = slopeA - slopeB;
    return isNaN(slopeDiff) ? 0 : slopeDiff;
  }

  function findNextTargetInOldGraph(v) {
    let target = oldGraph.node(v);
    if (target) {
      visitedTargets = {};
      return target;
    }
    visitedTargets[v] = true;

    const successors = g.successors(v) || [];
    for (const successor of successors) {
      if (!visitedTargets[successor]) {
        const result = findNextTargetInOldGraph(successor);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  return layers;
}

"use strict";

let util = require("../util");

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

  let orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
  orderedVs.forEach(dfs);

  function compareOldOrder(a, b) {
    let nodeA = g.node(a);
    let nodeB = g.node(b);
    // treat as equal if there is no oldGraph or if (a or b are not dummy nodes for edges)
    if (!oldGraph ||
      nodeA.dummy !== "edge" || nodeB.dummy !== "edge") {
      return 0;
    }

    const targetA = oldGraph.node(nodeA.edgeObj.w);
    const targetB = oldGraph.node(nodeB.edgeObj.w);
    // If either target is not found in the oldGraph, treat as equal
    if (!targetA || !targetB) {
      return 0;
    }

    const layout = oldGraph.graph().rankdir.toLowerCase() || "lr"; // Default to Left-Right
    let coordA, coordB;
    if (layout === "lr" || layout === "rl") {
      // Left-Right or Right-Left: y-coordinate varies, x is ranks
      coordA = targetA.y;
      coordB = targetB.y;
    } else {
      // Top-Bottom or Bottom-Top: x-coordinate varies, y is ranks
      coordA = targetA.x;
      coordB = targetB.x;
    }
    // Lower coordinate gets lower order (comes first)
    return coordA - coordB;
  }

  return layers;
}

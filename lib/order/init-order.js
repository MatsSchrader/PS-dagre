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
function initOrder(g, oldGraph, oldNodes) {
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
    if (!(oldNodes && nodeA && nodeB &&
      nodeA.dummy === "edge" && nodeB.dummy === "edge" &&
      oldNodes[nodeA.edgeObj.v] && oldNodes[nodeB.edgeObj.v] && oldNodes[nodeA.edgeObj.w] && oldNodes[nodeB.edgeObj.w])) {
      return 0;
    }
    // if both edges have the same source we are in the forward direction (start -> end)
    // since we only get here if barycenters are the same
    const isForward = nodeA.edgeObj.v === nodeB.edgeObj.v;
    const targetRank = isForward? oldNodes[nodeA.edgeObj.v].rank + 1 : oldNodes[nodeA.edgeObj.w].rank - 1;

    const oldA = Object.entries(oldNodes).find(n => n[1].edgeObj?.v === nodeA.edgeObj.v && n[1].edgeObj?.w === nodeA.edgeObj.w && n[1].rank === targetRank);
    const oldB = Object.entries(oldNodes).find(n => n[1].edgeObj?.v === nodeB.edgeObj.v && n[1].edgeObj?.w === nodeB.edgeObj.w && n[1].rank === targetRank);
    if (!oldA || !oldB) {
      return 0;
    }
    const oldOrderA = oldA[1].order;
    const oldOrderB = oldB[1].order;
    return isNaN(oldOrderA - oldOrderB) ? 0 : oldOrderA - oldOrderB;
  }

  return layers;
}

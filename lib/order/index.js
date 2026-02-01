"use strict";

let initOrder = require("./init-order");
let crossCount = require("./cross-count");
let sortSubgraph = require("./sort-subgraph");
let buildLayerGraph = require("./build-layer-graph");
let addSubgraphConstraints = require("./add-subgraph-constraints");
let Graph = require("@dagrejs/graphlib").Graph;
let util = require("../util");

module.exports = order;

/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
function order(g, opts = {}, oldGraph, oldNodes) {
  if (typeof opts.customOrder === 'function') {
    opts.customOrder(g, order);
    return;
  }

  let maxRank = util.maxRank(g),
    downLayerGraphs = buildLayerGraphs(g, util.range(1, maxRank + 1), "inEdges"),
    upLayerGraphs = buildLayerGraphs(g, util.range(maxRank - 1, -1, -1), "outEdges");

  let layering = initOrder(g, oldNodes);
  assignOrder(g, layering);

  if (opts.disableOptimalOrderHeuristic) {
    return;
  }

  let bestCC = crossCount(g, layering);
  if (bestCC === 0) return;
  let best = Object.assign({}, layering);

  const constraints = opts.constraints || [];
  for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2, oldNodes, constraints);

    layering = util.buildLayerMatrix(g);
    let cc = crossCount(g, layering);
    if (cc < bestCC) {
      lastBest = 0;
      best = Object.assign({}, layering);
      bestCC = cc;
    } else if (cc === bestCC) {
      best = structuredClone(layering);
    }
  }

  assignOrder(g, best);
}

function buildLayerGraphs(g, ranks, relationship) {
  // Build an index mapping from rank to the nodes with that rank.
  // This helps to avoid a quadratic search for all nodes with the same rank as
  // the current node.
  const nodesByRank = new Map();
  const addNodeToRank = (rank, node) => {
    if (!nodesByRank.has(rank)) {
      nodesByRank.set(rank, []);
    }
    nodesByRank.get(rank).push(node);
  };

  // Visit the nodes in their original order in the graph, and add each
  // node to the ranks(s) that it belongs to.
  for (const v of g.nodes()) {
    const node = g.node(v);
    if (typeof node.rank === "number") {
      addNodeToRank(node.rank, v);
    }
    // If there is a range of ranks, add it to each, but skip the `node.rank` which
    // has already had the node added.
    if (typeof node.minRank === "number" && typeof node.maxRank === "number") {
      for (let r = node.minRank; r <= node.maxRank; r++) {
        if (r !== node.rank) {
          // Don't add this node to its `node.rank` twice.
          addNodeToRank(r, v);
        }
      }
    }
  }

  return ranks.map(function (rank) {
    return buildLayerGraph(g, rank, relationship, nodesByRank.get(rank) || []);
  });
}

function sweepLayerGraphs(layerGraphs, switchBias, oldNodes) {
  let biasRight, constraints = true;
  let cg = new Graph();
  layerGraphs.forEach(function(lg) {
    constraints.forEach(con => cg.setEdge(con.left, con.right));

    let root = lg.graph().root;
    let {result: sorted, usedBias} = sortSubgraph(lg, root, cg, biasRight, oldNodes);
    if (switchBias && usedBias) {
      biasRight = !biasRight;
    }
    sorted.vs.forEach((v, i) => lg.node(v).order = i);
    addSubgraphConstraints(lg, cg, sorted.vs);
  });
}

function assignOrder(g, layering) {
  Object.values(layering).forEach(layer => layer.forEach((v, i) => g.node(v).order = i));
}

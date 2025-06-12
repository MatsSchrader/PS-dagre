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
function order(g, opts, oldGraph) {
  if (opts && typeof opts.customOrder === 'function') {
    opts.customOrder(g, order);
    return;
  }

  let maxRank = util.maxRank(g),
    downLayerGraphs = buildLayerGraphs(g, util.range(1, maxRank + 1), "inEdges"),
    upLayerGraphs = buildLayerGraphs(g, util.range(maxRank - 1, -1, -1), "outEdges");

  let layering = initOrder(g, oldGraph);
  assignOrder(g, layering);

  if (opts && opts.disableOptimalOrderHeuristic) {
    return;
  }

  let bestCC = crossCount(g, layering);
  if (bestCC === 0) return;

  let best = Object.assign({}, layering);

  for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);

    layering = util.buildLayerMatrix(g);
    let cc = crossCount(g, layering);
    if (cc < bestCC) {
      lastBest = 0;
      best = Object.assign({}, layering);
      bestCC = cc;
      if (bestCC === 0) break;
    }
    if (i === 3 && lastBest < 3) {
      //TODO seems like the order is irrelevant in downLayers and upLayers, so this change improves nothing
      debugger;
      // assigning the order updates downLayerGraphs and upLayerGraphs
      assignOrder(g, best);
      // Reset the loop to continue improving
      i = -1;
      lastBest = -1;
    }
  }

  assignOrder(g, best);
}

function buildLayerGraphs(g, ranks, relationship) {
  return ranks.map(function(rank) {
    return buildLayerGraph(g, rank, relationship);
  });
}

function sweepLayerGraphs(layerGraphs, switchBias) {
  let biasRight = false;
  let cg = new Graph();
  layerGraphs.forEach(function(lg) {
    let root = lg.graph().root;
    let {result: sorted, usedBias} = sortSubgraph(lg, root, cg, biasRight);
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

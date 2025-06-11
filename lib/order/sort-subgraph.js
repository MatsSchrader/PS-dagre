let barycenter = require("./barycenter");
let resolveConflicts = require("./resolve-conflicts");
let sort = require("./sort");

module.exports = sortSubgraph;

function sortSubgraph(g, v, cg, biasRight) {
  let movable = g.children(v);
  let node = g.node(v);
  let bl = node ? node.borderLeft : undefined;
  let br = node ? node.borderRight: undefined;
  let subgraphs = {};

  if (bl) {
    movable = movable.filter(w => w !== bl && w !== br);
  }

  let barycenters = barycenter(g, movable);
  barycenters.forEach(entry => {
    if (g.children(entry.v).length) {
      let {result: subgraphResult} = sortSubgraph(g, entry.v, cg, biasRight);
      subgraphs[entry.v] = subgraphResult;
      if (Object.hasOwn(subgraphResult, "barycenter")) {
        mergeBarycenters(entry, subgraphResult);
      }
    }
  });

  let entries = resolveConflicts(barycenters, cg);
  expandSubgraphs(entries, subgraphs);

  const reversedPairs = {};
  let usedBias = false;
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      if (entries[i].barycenter === entries[j].barycenter) {
        let nameI = entries[i].vs[0];
        let nameJ = entries[j].vs[0];
        let nodeI = g.node(nameI);
        let nodeJ = g.node(nameJ);

        if (nodeI.edgeObj?.v === nodeJ.edgeObj?.v &&
          nodeI.edgeObj?.w === nodeJ.edgeObj?.w) {
          if (nodeI.edgeLabel.reversed) {
            reversedPairs[nameJ] = entries[i];
            entries.splice(i, 1);
          } else {
            reversedPairs[nameI] = entries[j];
            entries.splice(j, 1);
          }

        } else {
          usedBias = true;
        }
      }
    }
  }

  let result = sort(entries, biasRight, reversedPairs);

  if (bl) {
    result.vs = [bl, result.vs, br].flat(true);
    if (g.predecessors(bl).length) {
      let blPred = g.node(g.predecessors(bl)[0]),
        brPred = g.node(g.predecessors(br)[0]);
      if (!Object.hasOwn(result, "barycenter")) {
        result.barycenter = 0;
        result.weight = 0;
      }
      result.barycenter = (result.barycenter * result.weight +
                           blPred.order + brPred.order) / (result.weight + 2);
      result.weight += 2;
    }
  }

  return {result: result, usedBias: usedBias};
}

function expandSubgraphs(entries, subgraphs) {
  entries.forEach(entry => {
    entry.vs = entry.vs.flatMap(v => {
      if (subgraphs[v]) {
        return subgraphs[v].vs;
      }
      return v;
    });
  });
}

function mergeBarycenters(target, other) {
  if (target.barycenter !== undefined) {
    target.barycenter = (target.barycenter * target.weight +
                         other.barycenter * other.weight) /
                        (target.weight + other.weight);
    target.weight += other.weight;
  } else {
    target.barycenter = other.barycenter;
    target.weight = other.weight;
  }
}

let util = require("../util");

module.exports = sort;

function sort(entries, biasRight, reversedPairs, oldNodes, g) {
  let parts = util.partition(entries, entry => {
    return Object.hasOwn(entry, "barycenter");
  });
  let sortable = parts.lhs,
    unsortable = parts.rhs.sort((a, b) => b.i - a.i),
    vs = [],
    sum = 0,
    weight = 0,
    vsIndex = 0;

  sortable.sort(compareWithOldOrder(g, oldNodes, !!biasRight));

  // re-inserts the links, that are already in sortable but reversed, next to its reverse counterpart
  for (const [key, value] of Object.entries(reversedPairs)) {
    const keyIndex = sortable.findIndex(entry => entry.vs[0] === key);
    sortable.splice(keyIndex + 1, 0, value);
  }

  vsIndex = consumeUnsortable(vs, unsortable, vsIndex);

  sortable.forEach(entry => {
    vsIndex += entry.vs.length;
    vs.push(entry.vs);
    sum += entry.barycenter * entry.weight;
    weight += entry.weight;
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
  });

  let result = { vs: vs.flat(true) };
  if (weight) {
    result.barycenter = sum / weight;
    result.weight = weight;
  }
  return result;
}

function consumeUnsortable(vs, unsortable, index) {
  let last;
  while (unsortable.length && (last = unsortable[unsortable.length - 1]).i <= index) {
    unsortable.pop();
    vs.push(last.vs);
    index++;
  }
  return index;
}

function compareWithOldOrder(g, oldNodes, bias) {
  return (entryA, entryB) => {
    if (entryA.barycenter < entryB.barycenter) {
      return -1;
    } else if (entryA.barycenter > entryB.barycenter) {
      return 1;
    }

    let nodeA = g.node(entryA.vs[0]);
    let nodeB = g.node(entryB.vs[0]);

    if (oldNodes && nodeA && nodeB &&
      nodeA.dummy === "edge" && nodeB.dummy === "edge" &&
      oldNodes[nodeA.edgeObj.v] && oldNodes[nodeB.edgeObj.v] && oldNodes[nodeA.edgeObj.w] && oldNodes[nodeB.edgeObj.w]) {

      // if both edges have the same source we are in the forward direction (start -> end)
      // since we only get here if barycenters are the same
      const isForward = nodeA.edgeObj.v === nodeB.edgeObj.v;
      const targetRank = isForward? oldNodes[nodeA.edgeObj.v].rank + 1 : oldNodes[nodeA.edgeObj.w].rank - 1;

      const oldA = Object.entries(oldNodes).find(n => n[1].edgeObj?.v === nodeA.edgeObj.v && n[1].edgeObj?.w === nodeA.edgeObj.w && n[1].rank === targetRank);
      const oldB = Object.entries(oldNodes).find(n => n[1].edgeObj?.v === nodeB.edgeObj.v && n[1].edgeObj?.w === nodeB.edgeObj.w && n[1].rank === targetRank);
      if (oldA && oldB) {
        const oldOrderA = oldA[1].order;
        const oldOrderB = oldB[1].order;
        return isNaN(oldOrderA - oldOrderB) ? 0 : oldOrderA - oldOrderB;
      }
    }

    return !bias ? entryA.i - entryB.i : entryB.i - entryA.i;
  };
}

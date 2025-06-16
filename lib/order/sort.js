let util = require("../util");

module.exports = sort;

function sort(entries, biasRight, reversedPairs, g) {
  let parts = util.partition(entries, entry => {
    return Object.hasOwn(entry, "barycenter");
  });
  let sortable = parts.lhs,
    unsortable = parts.rhs.sort((a, b) => b.i - a.i),
    vs = [],
    sum = 0,
    weight = 0,
    vsIndex = 0;

  sortable.sort(compareWithBias(!!biasRight, g));
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

function compareWithBias(bias, g) {
  let coreProcess = {
    "Start": "Create Purchase Order Item",
    "Create Purchase Order Item": "Vendor creates invoice",
    "Vendor creates invoice": "Record Goods Receipt",
    "Record Goods Receipt": "Record Invoice Receipt",
    "Record Invoice Receipt": "Clear Invoice",
    "Clear Invoice": "End",
    "End": "Start"
  };

  return (entryV, entryW) => {
    const vName = entryV.vs[0],
      wName = entryW.vs[0];

    const vIsCore =   coreProcess[vName] ||
      (g.node(vName).edgeObj && !g.node(vName).edgeLabel.reversed &&
        (coreProcess[g.node(vName).edgeObj.v] === g.node(vName).edgeObj.w));
    const wIsCore =   coreProcess[wName] ||
        (g.node(wName).edgeObj && !g.node(wName).edgeLabel.reversed &&
            (coreProcess[g.node(wName).edgeObj.v] === g.node(wName).edgeObj.w));

    if (vIsCore || entryV.barycenter < entryW.barycenter) {
      return -1;
    } else if (wIsCore || entryV.barycenter > entryW.barycenter) {
      return 1;
    }

    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
  };
}

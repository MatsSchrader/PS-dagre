document.addEventListener("DOMContentLoaded", function () {
// Create a new directed graph
  const {graphlib, layout} = require("./index");
  var g = new graphlib.Graph();

  // Set an object for the graph label
  g.setGraph({});

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function() { return {}; });

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  g.setNode("kspacey",    { label: "Kevin Spacey",  width: 144, height: 100 });
  g.setNode("swilliams",  { label: "Saul Williams", width: 160, height: 100 });
  g.setNode("bpitt",      { label: "Brad Pitt",     width: 108, height: 100 });
  g.setNode("hford",      { label: "Harrison Ford", width: 168, height: 100 });
  g.setNode("lwilson",    { label: "Luke Wilson",   width: 144, height: 100 });
  g.setNode("kbacon",     { label: "Kevin Bacon",   width: 121, height: 100 });

  // Add edges to the graph.
  g.setEdge("kspacey",   "swilliams");
  g.setEdge("swilliams", "kbacon");
  g.setEdge("bpitt",     "kbacon");
  g.setEdge("hford",     "lwilson");
  g.setEdge("lwilson",   "kbacon");

  layout(g);

//   //const d3 = require("d3");
//   //const {graphlib} = require("./index");
//   const g = new dagreD3.graphlib.Graph().setGraph({});
//
//   // Define nodes
//   g.setNode("A", { label: "Node A", width: 100, height: 50 });
//   g.setNode("B", { label: "Node B", width: 100, height: 50 });
//   g.setNode("C", { label: "Node C", width: 100, height: 50 });
//
//   // Define edges
//   g.setEdge("A", "B");
//   g.setEdge("B", "C");
//
//   // Render the graph
//   const svg = d3.select("svg");
//   const inner = svg.select("g");
//   /* global dagreD3 */
//   const render = new dagreD3.render();
//   render(inner, g);
//
//   // Center graph
//   const { width, height } = svg.node().getBoundingClientRect();
//   const graphWidth = g.graph().width;
//   const graphHeight = g.graph().height;
//   svg.attr("viewBox", `0 0 ${graphWidth} ${graphHeight}`);
});

// Set Overall Visual size

//Color Palette 
var colors = ['#49787e','#b3d2cd','#06304e','#86a6a2','#305b65','#97beb7','#154e67','#6a9e9d','#84b4bc','#ececec','#2a4648', '#cbdeef', '#8bb4db', '#3579b0', '#616167', '#2d436e', '#38383c']  
  
function treeMap(data){

  var width = 400,
      height = 250,
      color = d3.scale.category20c(),
      div = d3.select("#visual1")
            .append("svg")
           
            
  
  //Append Tooltip
  var tool = d3.select("body")
              .append("div")
              .attr("class", "toolTip");
  
  // Extract data
  var treemap = d3.layout
      .treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.value; });

  // Define individual node
  var node = div.datum(data)
      .selectAll(".node")
      .data(treemap.nodes)
      .enter()
      .append("div")
      .attr("class", "node")
      .style("background-color", function(d, i){ return colors[i];})
      .call(position)
      .append('div')
      .style("font-size", function(d) {
          // compute font size based on sqrt(area)
          return Math.max(6, 0.14*Math.sqrt(d.area))+'px'; })
        .text(function(d) { return d.children ? null : d.topic; })
        .style("text-align", "center")
      .on("mousemove", function (d) {
          tool.style("left", d3.event.pageX + 10 + "px")
          tool.style("top", d3.event.pageY - 20 + "px")
          tool.style("display", "inline-block");
          tool.html(d.children ? null : d.topic)
      }).on("mouseout", function (d) {
          tool.style("display", "none");
      });
}
  
// To set position and area of boxes based on distribution for Cause Data Visual
function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx+1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy + 1) + "px"; });
}
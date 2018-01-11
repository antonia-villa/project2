var colors = ['#49787e','#b3d2cd','#06304e','#86a6a2','#305b65','#97beb7','#154e67','#6a9e9d','#84b4bc','#ececec','#2a4648', '#cbdeef', '#8bb4db', '#3579b0', '#616167', '#2d436e', '#38383c']  
  

function treeMap(data){

    var width = 400;
    var height = 250;

    // Prepare our physical space
    var g = d3
    	.select('svg')
    	.attr('width', width)
    	.attr('height', height)
    	.select('g');


        // Declare d3 layout
        // Extract data
  var treemap = d3.layout
      .treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.value; });

  var node = g.datum(data)
		.selectAll('rect')
		.data(treemap.nodes)
		.enter()
		.append('rect')
		.style("background-color", function(d, i){ return colors[i];})
		.call(position)
}

// To set position and area of boxes based on distribution for Cause Data Visual
function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx+1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy + 1) + "px"; });
}
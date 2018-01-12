//var colors = ['#49787e','#b3d2cd','#06304e','#86a6a2','#305b65','#97beb7','#154e67','#6a9e9d','#84b4bc','#ececec','#2a4648', '#cbdeef', '#8bb4db', '#3579b0', '#616167', '#2d436e', '#38383c']  


function treeMap(data, svg){

    var width = 500;
    var height = 300;
    colors = d3.scale.category20c();

    // Prepare our physical space
    var g = d3
    	.select("."+svg)
 

  //Append Tooltip
  var tool = d3.select("."+svg)
              .append("div")
              .attr("class", "toolTip");

        // Declare d3 layout
        // Extract data
  var treemap = d3.layout
      .treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.value; });

  var node = g.datum(data)
		.selectAll("."+svg)
    .attr('class', svg)
		.data(treemap.nodes)
		.enter()
		.append('rect')
    .attr('id', function(d) { return svg + d.statistic; } )
		.style("background-color", function(d, i){ return colors[i];})
    .call(position)
    .on("mouseenter", function (d) {
          tool.style("left", d3.event.pageX + 10 + "px")
          tool.style("top", d3.event.pageY - 20 + "px")
          tool[0][0].style.display = "inline-block";
          tool[0][0].textContent = d.statistic;
      }).on("mouseout", function (d) {
          console.log('mouseout')
          tool[0][0].style.display = "none";
      });

    //g.append(tool);
    //$('svg.visual1')[0].append(tool);
}

// To set position and area of boxes based on distribution for Cause Data Visual
function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx+1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy + 1) + "px"; });
}
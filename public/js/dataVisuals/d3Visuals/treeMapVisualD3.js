function treeMapd3(data, svg){

    var width = 500,
        height = 300,
        color = d3.scale.category20c();

    // Prepare our physical space
    var g = d3
    	.select("."+svg)
  console.log(data);

    //Append Tooltip
    var tool = d3.select('body')
                .append("div")
                .attr("class", "toolTip");


  var treemap = d3.layout
      .treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.total; });

  var node = g.datum(data)
		.selectAll("."+svg)
    .attr('class', svg)
		.data(treemap.nodes)
		.enter()
		.append('rect')
    .attr('id', function(d) { return svg +":"+ d.statistic; } )
		.style("background-color", function(d, i){ return color[i];})
    .call(position)
    .on("mousemove", function (d) {
          tool.style("left", d3.event.pageX + 10 + "px")
          tool.style("top", d3.event.pageY - 20 + "px")
          tool.style("display", "inline-block");
          console.log(d.statistic)
          tool.html('Statistic:' + d.statistic +'<br> Value:'+ d.total)
      }).on("mouseout", function (d) {
          tool.style("display", "none");
      });



}

// To set position and area of boxes based on distribution for Cause Data Visual
function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}
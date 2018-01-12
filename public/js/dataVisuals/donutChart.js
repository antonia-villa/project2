function donutChart(data, svg){

	var width = 300;
	var height = 300;
	var radius = Math.min(width, height) / 2;

	var donutWidth = 100;

	var color = d3.scale.ordinal()
  				.range(['#f37a4d', '#648C85']);

  	var svg = d3.select("."+svg)
			  .append('svg')
			  .attr('class', svg)
			  .attr('width', width)
			  .attr('height', height)
			  .append('g')
			  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

	var arc = d3.svg.arc()
		 	.innerRadius(radius - donutWidth)
			.outerRadius(radius);

  	var pie = d3.layout.pie()
  		.value(function(d) { return d.value; })
  		.sort(function(d) {
		return d.value;
		});


  	var path = svg.selectAll('path')
		  .data(pie(data))
		  .enter()
		  .append('path')
		  .attr('d', arc)
		  .attr('fill', function(d, i) {
		    return color(d.data.statistic);
		  });



}
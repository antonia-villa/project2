function barChart(dataSet, svgClass){
  
    // Retrieve data values
  var data = Object.values(dataSet).map(function(v) {
    return v;
  });

  // Retrieve data labels
  var label = Object.keys(dataSet).map(function(v) {
    return v;
  });

  var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("."+svgClass)
              .append("svg");
              .attr('class', svgClass);
}

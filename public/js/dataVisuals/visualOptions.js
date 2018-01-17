// Select data topics
var dataSet1 = results[0];
var dataSet2 = results[1];

var mainTopic1 = results[0].mainTopic1;
var mainTopic2 = results[0].mainTopic2;

function determineVisual(mainTopic, dataSet, divId){

	// determine which visual to use based on the topic 
	if(mainTopic.toString() == "Population" ){
		$('#'+divId+'_header').append('<h3 class="visualtopicHeading"> Demographic Distribution</h3>');
		var data = chartsJSData(mainTopic, dataSet);
		barChart(mainTopic, data, divId);
	} else if (mainTopic.toString() == "Employment"){
		$('#'+divId+'_header').append('<h3 class="visualtopicHeading"> Employment vs Unemployment</h3>');
		var data = chartsJSData(mainTopic, dataSet);
		donutChart(mainTopic, data, divId);
	} else if (mainTopic.toString() == "Poverty"){
		$('#'+divId+'_header').append('<h3 class="visualtopicHeading"> Poverty Distribution by Demographic</h3>');
		var data = chartsJSData(mainTopic, dataSet);
		polarAreaChart(mainTopic, data, divId);
	} else if (mainTopic.toString() == "Commute"){
		$('#'+divId+'_header').append('<h3 class="visualtopicHeading"> Time Spent Commuting</h3>');
		var data = chartsJSData(mainTopic, dataSet);
		barChart(mainTopic, data, divId);
	} else if (mainTopic.toString() == "Education"){
		$('#'+divId+'_header').append('<h3 class="visualtopicHeading"> Education Status</h3>');
		var data = chartsJSData(mainTopic, dataSet);
		donutChart(mainTopic, data, divId);
	}
}

// Used for D3 TreeData structure
function treeData(mainTopic, dataSet){
	var children = []

	for(keys in dataSet){
		if((keys.split('_')[0]).toString() == mainTopic.toString().toLowerCase() && (keys.toString() != mainTopic.toString().toLowerCase())){
			var child = {
		  		'statistic': keys.replace(/_/g, ' '),
		  		'total': dataSet[keys]
			}

				children.push(child);
		}
	}
  	// Create Tree Structure
  	var tree = {
      	topic: mainTopic,
      	children: children
  	};
  	return tree;
}

// Used for D3 Donut data structure
function donutData(mainTopic, dataSet){
	var donutData = [];

	for(keys in dataSet){
		if((keys.split('_')[0]).toString() == mainTopic.toString().toLowerCase()){
			var child = {
		  		'statistic': keys.replace(/_/g, ' '),
		  		'total': dataSet[keys]
			}
			donutData.push(child);
		}
	}
	return donutData;
}

// Used for all ChartsJS Data structure
function chartsJSData(mainTopic, dataSet){
	// Extract subData Set
	var subDataSet = {};
	for(keys in dataSet){
		if((keys.split('_')[0]).toString() == mainTopic.toString().toLowerCase() && (keys.toString() != mainTopic.toString().toLowerCase())){
			var text = String(keys.replace(/_/g, ' '));
			var label = text.substr(text.indexOf(' ')+1);
			subDataSet[label] = Number(dataSet[keys]);
		}
	}
	
	// Sort dataset by values
	function sort(obj) {
	  return Object.keys(obj).sort(function(a, b) {
	    return obj[b] - obj[a];
	  });
	}
	var sorted = sort(subDataSet);
	var sortedData = sorted.map(function(key) { 
  		return {[key]: subDataSet[key]}
	});
    
	// Crete array of values and labels for ChartsJS
	var values = [];
  	var labels = [];
  	var total;

  	sortedData.forEach(function(item){
  		labels.push(toTitleCase(Object.keys(item)));
  		values.push(Number(Object.values(item)));
  	})

  	var total = values.reduce((a, b) => a + b, 0);

	var barData = [labels, values, total]
	return barData;
}

// Create Charts when page loads
$(document).ready(function(){

	// MAIN TOPIC 1
	// Select element to build MainTopic1 Visual (data1_viz1 and data2_viz1)
	var data1_viz1 = $('#data1_viz1').attr('id');
	var data2_viz1 = $('#data2_viz1').attr('id');

	// Determine Visual for the Main Topic 1 Selected
	determineVisual(mainTopic1, dataSet1, data1_viz1);
	determineVisual(mainTopic1, dataSet2, data2_viz1);

	// MAIN TOPIC 1
	// Select element to build MainTopic1 Visual (data1_viz1 and data2_viz1)
	var data1_viz2 = $('#data1_viz2').attr('id');
	var data2_viz2 = $('#data2_viz2').attr('id');

	// Determine Visual for the Main Topic 1 Selected
	determineVisual(mainTopic2, dataSet1, data1_viz2);
	determineVisual(mainTopic2, dataSet2, data2_viz2);

});

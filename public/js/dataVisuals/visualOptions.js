// Select data topics
var dataSet1 = results[0];
var dataSet2 = results[1]

var mainTopic1 = results[0].mainTopic1;
var mainTopic2 = results[0].mainTopic2;

function determineVisual(mainTopic, dataSet, divId){

	// determine which visual to use based on the topic 
	if(mainTopic.toString() == "Population" ){
		$('#'+divId+'_header').append('<h3 class="visualtopicHeading"> Distribution by Race</h3>');
		var data = chartsJSData(mainTopic, dataSet);
		barChart(mainTopic, data, divId);
	} else if (mainTopic.toString() == "Employment"){
		$('#'+divId+'_header').append('<h3 class="visualtopicHeading"> Employment vs Unemployment</h3>');
		var data = chartsJSData(mainTopic, dataSet);
		donutChart(mainTopic, data, divId);
	}

}

// Used for D3 TreeData
function treeData(mainTopic, dataSet){

	var children = []

	//Reformat Data for tree structure
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

// Used for D3 Donut Data
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

// Charts JS Data
function chartsJSData(mainTopic, dataSet){
	
	var values = [];
  	var labels = [];

	for(keys in dataSet){
		if((keys.split('_')[0]).toString() == mainTopic.toString().toLowerCase() && (keys.toString() != mainTopic.toString().toLowerCase())){
			var label = String(keys.replace(/_/g, ' '));
			labels.push(label);

			var value = Number(dataSet[keys]);
			values.push(value);
		}
	}
	var barData = [labels, values]
	return barData;
}

//Run Function
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

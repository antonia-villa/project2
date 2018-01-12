// Select data topics
var dataSet1 = results[0];
var dataSet2 = results[1]

var mainTopic1 = results[0].mainTopic1;
var mainTopic2 = results[0].mainTopic2;

function determineVisual(mainTopic, dataSet, svg){

	// determine which visual to use based on the topic 
	if(mainTopic.toString() == "Population" ){
		$('#'+svg+'Header').append('<h3 class="visualtopicHeading"> Distribution by Race</h3>');
		var data = barChartData(mainTopic, dataSet);
		barChart(data, svg);
	} else if (mainTopic.toString() == "Employment"){
		$('#'+svg+'Header').append('<h3 class="visualtopicHeading"> Employment vs Unemployment</h3>');
		var data = donutData(mainTopic, dataSet);
		console.log('donutData', data);
		donutChart(data, svg);
	} else if (mainTopic.toString() == "Poverty"){
		$('#'+svg+'Header').append('<h3 class="visualtopicHeading"> Poverty</h3>');
		var data = donutData(mainTopic, dataSet);
		console.log('donutData', data);
		donutChart(data, svg);
	} else if (mainTopic.toString() == "Commute"){
		$('#'+svg+'Header').append('<h3 class="visualtopicHeading">Commute</h3>');
		var data = treeData(mainTopic, dataSet);
		console.log('tree data', data);
		treeMap(data, svg);
	} else if (mainTopic.toString() == "Education"){
		$('#'+svg+'Header').append('<h3 class="visualtopicHeading">Education</h3>');
		var data = treeData(mainTopic, dataSet);
		console.log('tree data', data);
		treeMap(data, svg);
	}

}

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

function barChartData(mainTopic, dataSet){
	console.log('data test', dataSet);

	var barData = [];

	for(keys in dataSet){
		if((keys.split('_')[0]).toString() == mainTopic.toString().toLowerCase() && (keys.toString() != mainTopic.toString().toLowerCase())){
			var object = {}
			var stat = keys.replace(/_/g, ' ');
			var value = dataSet[keys];
			object[stat] = value;
			barData.push(object);
		}
	}
	return barData;
}

//Run Function
$(document).ready(function(){

	// Select SVG Element to build MainTopic1 Visual
	var svg1_1 = $('.visual1_1').attr('class');
	var svg2_1 = $('.visual2_1').attr('class');

	// Select SVG Element to build MainTopic2 Visual
	var svg1_2 = $('.visual1_2').attr('class');
	var svg2_2 = $('.visual2_2').attr('class');

	// Determine Visual for the Main Topic 1 Selected
	determineVisual(mainTopic1, dataSet1, svg1_1);
	determineVisual(mainTopic1, dataSet2, svg2_1);

	// Determine Visual for the Main Topic 2 Selected
	determineVisual(mainTopic2, dataSet1, svg1_2);
	determineVisual(mainTopic2, dataSet2, svg2_2);

});

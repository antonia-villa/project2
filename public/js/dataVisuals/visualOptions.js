// Select data topics
var dataSet1 = results[0];
var dataSet2 = results[1]

var mainTopic1 = results[0].mainTopic1;
var mainTopic2 = results[0].mainTopic2;

function determineVisual(mainTopic, dataSet, svg){

	// determine which visual to use based on the topic 
	if(mainTopic.toString() == "Population"){
		$('#'+svg+'Header').append('<h3 class="visualtopicHeading"> Distribution by Race</h3>');
		var data = treeData(mainTopic, dataSet);
		treeMap(data, svg);
	}
}

function treeData(mainTopic, dataSet){

	var children = []

	//Reformat Data for tree structure
	for(keys in dataSet){
		if((keys.split('_')[0]).toString() == mainTopic.toString().toLowerCase() && (keys.toString() != mainTopic.toString().toLowerCase())){
			var child = {
		  		'statistic': keys,
		  		'value': dataSet[keys]
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

//Run Function
$(document).ready(function(){
	var svg1 = $('.visual1').attr('class');
	var svg2 = $('.visual2').attr('class');
	determineVisual(mainTopic1, dataSet1, svg1);
	determineVisual(mainTopic1, dataSet2, svg2);

})

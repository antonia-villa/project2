// Select data topics
var dataSet1 = results[0];
var dataSet2 = results[1]

var mainTopic1 = results[0].mainTopic1;
var mainTopic2 = results[0].mainTopic2;

function determineVisual(mainTopic, dataSet){

	// determine which visual to use based on the topic 
	if(mainTopic.toString() == "Population"){
		var data = treeData(mainTopic, dataSet);
		
		treeMap(data);
		console.log('data', data);
	}
}

function treeData(mainTopic, dataSet){

	var children = []

	//Reformat Data for tree structure
	for(keys in dataSet){
		if((keys.split('_')[0]).toString() == mainTopic.toString().toLowerCase()){
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
	determineVisual(mainTopic1, dataSet1);

})

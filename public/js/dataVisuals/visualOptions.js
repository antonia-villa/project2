
// Select data topics from results data

var mainTopic1 = results[0][Object.keys(results[0])[Object.keys(results[0]).length-2]]
var mainTopic2 = results[0][Object.keys(results[0])[Object.keys(results[0]).length-1]]

function determineVisual(mainTopic){
	// determine which visual to use based on the topic 
	if(mainTopic === "Population"){
		var data = treeData(mainTopic, results);
		console.log('data', data);
	}
}

function treeData(mainTopic, results){

	var children = []

	//Reformat Data for tree structure
	for(keys in results){
		if(keys.split('_')[0] == mainTopic){
			var child = {
		  		'statistic': keys,
		  		'value': results[keys]
			}
		  	// Add to Data Set
		  	children.push(child);
		}
	}

   
  	// Create Tree Structure
  	var tree = {
      	cause: mainTopic,
      	children: causeDataSet
  	};

  	return tree;
}

//Run Function
determineVisual(mainTopic1);
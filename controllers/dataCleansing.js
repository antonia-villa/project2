var topiclist = require('./data_topics');


module.exports = {
	dataFormat: function(rawdata){
		var zipcode = rawdata.zip;
		var year = rawdata.year;
		var city = rawdata.place_name;
		var percent_poverty = Math.floor((rawdata.data[0].poverty/rawdata.data[0].population)*100);

		var data = {zipcode:zipcode, year:year, city:city, percent_poverty:percent_poverty};
		var data_variables = rawdata.data[0];

		Object.assign(data,data_variables)
		return data;
	},

	subDataSets: function(rawdata, topic){

			var subtopics = [];
			var data_variables = rawdata.data[0];

			for(i in data_variables){
				if((i.split('_')[0] == topic.toLowerCase()) && (i.length != topic.length)){
					var child = {
						'stat': i,
						'value': data_variables[i]
					}
					subtopics.push(child);
				}
			}

			var tree = {
				'mainTopic': topic, 
				children: subtopics
			};

		return tree;

	}
}
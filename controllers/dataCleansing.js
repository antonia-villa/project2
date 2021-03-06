var topiclist = require('./data_topics');

// Format Raw API Data for data visuals
module.exports = {
	dataFormat: function(rawdata){
		var zipcode = rawdata.zip;
		var year = rawdata.year;
		var city = rawdata.place_name;
		var percent_poverty = ((rawdata.data[0].poverty/rawdata.data[0].population)*100).toFixed(2);

		var data = {zipcode:zipcode, year:year, city:city, percent_poverty:percent_poverty};
		var data_variables = rawdata.data[0];

		Object.assign(data,data_variables)
		return data;
	}
}
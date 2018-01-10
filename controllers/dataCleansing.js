module.exports = {
	dataFormat: function(rawdata){
		var zipcode = rawdata.zip;
		var year = rawdata.year;
		var city = rawdata.place_name;
		var percent_poverty = Math.floor((rawdata.poverty/rawdata.population)*100);

		var data = {zipcode:zipcode, year:year, city:city, percent_poverty:percent_poverty}
		var data_variables = rawdata.data[0];

		Object.assign(data,data_variables)
		return data;
	}
}

// var x ='yay';
// var val = dataCleanse.dataFormat(x);
// console.log(val);
// console.log(typeof topics.topics);
// console.log(topics.topics);

// Import Data Cleansing Functions

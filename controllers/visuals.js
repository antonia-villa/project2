require('dotenv').config();
var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../models');
var census = require('citysdk')(process.env.CENSUS_API_KEY);


router.get('/new', function(req, res){

	res.render('visuals/new');
});


//res.status(status).send(body)
router.post('/', function(req, res){
	// Input variables for API request
	var zipcode1 = req.body.zipcode1;
	var zipcode2 = req.body.zipcode2;
	var year = req.body.year;
	var topic1 = req.body.topic1.split(",");
	var topic2 = req.body.topic2.split(",");


	// Default statistics to return
	var defaultVariables = ["population", "age" , "income", "poverty"]
	
	// Variables based on users seletion 
	var variables = defaultVariables.concat(topic1, topic2);

	var request1 = {
    	"level": "state",
    	"zip": zipcode1,
    	"variables": variables,
    	"api": "acs5",
    	"year": year
	};

	var request2 = {
    	"level": "state",
    	"zip": zipcode2,
    	"variables": variables,
    	"api": "acs5",
    	"year": year
	};


	census.APIRequest(request1, function(response, topic1) {

	
	// Build Visual2 here
	 var data = response.data[0];
	 var zipcode = response.zip;
	 var year = response.year;
	 var city = response.place_name;
	 
	 var percent_poverty = Math.floor((data.poverty/data.population)*100);

	 res.render('visuals/visual', {
	 	topic1: topic1,
	 	zipcode1: zipcode,
	 	year1: year,
	 	city1: city,
	 	population1: data.population,
	 	age1: data.age,
	 	income1: data.income,
	 	percent_poverty1: percent_poverty
	 });
	});

	// census.APIRequest(request2, function(response) {
	// 	// Build Visual2 here
	//  var data = response.data[0];
	//  var zipcode = response.zip;
	//  var year = response.year;
	//  var city = response.place_name;
	 
	//  var percent_poverty = Math.floor((data.poverty/data.population)*100);

	//  res.render('visuals/visual', {
	//  	zipcode2: zipcode,
	//  	year2: year,
	//  	city2: city,
	//  	population2: data.population,
	//  	age2: data.age,
	//  	income2: data.income,
	//  	percent_poverty2: percent_poverty
	//  });
	// });

});

module.exports = router;
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
	console.log('body is', req.body);
	res.render('visuals/visual');

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

	// census.APIRequest(request1).then(function(response){
	// 	// Build Visual1 here
	//   console.log(response);
	// }).catch(function(err){
	// 	console.log('catch reached. err was', err);
	// 	res.status(500).send('uh oh :(');
	// });

	census.APIRequest(request1, function(response) {
		// Build Visual2 here
	  console.log(response);
	});

	census.APIRequest(request2, function(response) {
		// Build Visual2 here
	  console.log(response);
	});

});

module.exports = router;
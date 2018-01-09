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
	// Select additional variables based on users seletion 
	var subtopics1 = defaultVariables.concat(topic1);
	var subtopics2 = defaultVariables.concat(topic2);

	var request = {
    	"level": "state",
    	"zip": zipcode1,
    	"variables": subtopics1,
    	"api": "acs5",
    	"year": year
	};

	census.APIRequest(request, function(response) {
		// Build Visual here
	  console.log(response);
	});

});

module.exports = router;
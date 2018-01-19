require('dotenv').config();
var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var census = require('citysdk')(process.env.CENSUS_API_KEY);
var dataCleanse = require('./dataCleansing');
var topiclist = require('./data_topics');
var testData = require('./testData');
var async = require('async');
var request = require('request');


router.get('/new', isLoggedIn, function(req, res){
	res.render('visuals/new');
});

// //Testing Post Route for Default Data
  // router.post('/', function(req, res){
  // 	var results = testData.results
  // 	res.render('visuals/visual', {results: results});
  
  // })

// //Testing Post Route to Change API Call format
 // router.post('/', function(req, res){
 	// console.log('session results', req.session.results);
	// var request = req.session.results
	// console.log('session results', req.body)
	// res.render('visuals/new');
	// var results = testData.results
	// var request1 =  { 'zip': '21401',
	//   state: 'MD',
	//   level: 'state',
	//   sublevel: false,
	//   api: 'acs5',
	//   year: 2010,
	//   variables: ['income', 'population'],
	//   Authorization: '794638ba40362ec3eb7cc258e2dcc5a8d40d7d00',
	//   user: '794638ba40362ec3eb7cc258e2dcc5a8d40d7d00'
	// }

	// request('http://citysdk.commerce.gov', request1, function(err, response, body){
	// 	console.log('err', err);
	// 	console.log('res', response);
	// 	console.log('body', body);
	// 	res.send('see logs');
	// })

	//res.render('visuals/visual', {results: results});

 // })

// Live Post Route
router.post('/', isLoggedIn, function(req, res){

	// Input variables for API request from #dataInput form
	var zipcode1 = req.body.zipcode1;
	var zipcode2 = req.body.zipcode2;
	var year = req.body.year;
	var topic1Id = req.body.topic1
	var topic2Id = req.body.topic2

	// select subtopic from topics array located in (/controllers/data_topics.js)
	var topicName1 = topiclist.topics[topic1Id].topic
	var topicName2 = topiclist.topics[topic2Id].topic

	var subtopics = []

	// Join all subtopics from 
	for(i in topiclist.topics){
		if(topiclist.topics[i].id == topic1Id || topiclist.topics[i].id == topic2Id){
			subtopics = subtopics.concat(topiclist.topics[i].subTopic, topiclist.topics[i].subTopic);
		}
	}

	// Default statistics to return
	var defaultVariables = ["population", "age" , "income", "poverty"]

	// Final variable list based on users seletion 
	var variables = defaultVariables.concat(subtopics);

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

	// Request data from API
	function fn1(callback){
			census.APIRequest(request1, function(response) {
					var rawdata = response;
					var topic = topiclist.topics[topic1Id].topic;
					var data = dataCleanse.dataFormat(rawdata);
					data.mainTopic1 = [topicName1];
					data.mainTopic2 = [topicName2];
					callback(null, data);
					return data;
			});
	}


	function fn2(callback){
			census.APIRequest(request2, function(response) {
					var rawdata = response;
					var topic = topiclist.topics[topic2Id].topic;
					var data = dataCleanse.dataFormat(rawdata);
					data.mainTopic1 = [topicName1];
					data.mainTopic2 = [topicName2];
					callback(null, data);
					return data;
			});	
	}

	async.parallel([fn1, fn2], function(err, results){
		if(!err){
			console.log('returned data', req.session.results)
			req.session.results = results;
			res.redirect('/visuals/visual');
		 } else {
		 	res.render( './404', {error: err});
		 }
	});
});



router.get('/visual', isLoggedIn, function(req,res){
	var results = req.session.results;
	res.render('visuals/visual', {results: results});
});


module.exports = router;
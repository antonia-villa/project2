var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../models');


//res.status(status).send(body)
router.post('/', function(req, res){
	console.log('body is', req.body);
	res.redirect('/visual/new');
	// db.author.create(req.body).then(function(createdAuthor){
	// 	res.redirect('/authors/'+ createdAuthor.id);
	// }).catch(function(err){
	// 	console.log('catch reached. err was', err);
	// 	res.status(500).send('uh oh :(');
	// });
})

module.exports = router;
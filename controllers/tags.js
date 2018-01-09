var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');


router.get('/all', function(req,res){
	// db.category.findAll().then(function(categories){
	// 	res.render('categories/all', {categories: categories})
	// });
	res.render('tags/all')
});

module.exports = router;
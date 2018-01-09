var express = require('express');
var router = express.Router();
var db = require('../models');


router.get('/all', function(req,res){
	db.contribution.findAll({
		include:[db.user]
	});

	db.contribution.findAll().then(function(contributions){
		res.render('contributions/all')
	})

	// db.category.findAll().then(function(categories){
	// 	res.render('categories/all', {categories: categories})
	// });
});

module.exports = router;
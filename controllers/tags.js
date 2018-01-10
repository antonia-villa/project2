var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');


router.get('/all', function(req,res){
		db.tag.findAll().then(function(tags){
		res.render('tags/all', {tags: tags})
	});
});


router.get('/:id', function(req, res){
	db.tag.find({
		where:{id: req.params.id},
		include: [db.contribution]
	}).then(function(tag){
		res.render('tags/single', {tag: tag});
	});
})

module.exports = router;
var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var async = require('async');


router.get('/all', isLoggedIn, function(req,res){
	db.contribution.findAll({
		where: {userId: req.user.id},
	}).then(function(contributions){
		res.render('contributions/all', {contribution: contributions})
	}).catch(function(err){
		res.send('Sorry - an error occured.', err);
	});
});


router.post('/', isLoggedIn, function(req, res){
	// Create tags array for database storage
	var tags = req.body.tags.split(',');
	req.body.userId = req.user.id;

	db.contribution.create(req.body).then(function(createdContribution){
		async.forEach(tags, function(t, callback){
			db.tag.findOrCreate({
				where: {content: t.trim()}
			}).spread(function(tag, wasCreated){
				if(tag){
					createdContribution.addTag(tag);
				}
				callback();
			})

		}, function(){
			res.redirect('/contributions/' + createdContribution.id);
		});
	}).catch(function(err){
		res.send('Sorry - an error occured.', err);
	});
})

router.get('/:id', isLoggedIn, function(req,res){
	db.contribution.findOne({
		where: {id: req.params.id},
		include: [db.tag]
	}).then(function(contribution){
		res.render('contributions/single', {result: contribution});	
	}).catch(function(err){
		res.send('Sorry - an error occured.', err);
	});
})

module.exports = router;
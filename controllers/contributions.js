var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var async = require('async');


router.get('/all', isLoggedIn, function(req,res){
	db.contribution.findAll({
		where: {userId: req.user.id},
	}).then(function(contributions){
		console.log('contributions', contributions);
		res.render('contributions/all', {contribution: contributions})
	})

});


router.post('/', isLoggedIn, function(req, res){
	var tags = req.body.tags.split(',');
	req.body.userId = req.user.id;

	db.contribution.create(req.body).then(function(createdContribution){
			async.forEach(tags, function(t, callback){
				// Add tag to the tag table
				db.tag.findOrCreate({
					where: {content: t.trim()}
				}).spread(function(tag, wasCreated){
					if(tag){
						// This part is what adds the relationship in the join table
						createdContribution.addTag(tag);
					}
					// Calling this function is like saying this is done/resolved
					callback();
				})

			}, function(){
				// Happens when ALL calls are resolved
				res.redirect('/contributions/' + createdContribution.id);
			});

	}).catch(function(err){
		console.log('error', err);
		res.send('uh oh!', err);
	});
})

router.get('/:id', isLoggedIn, function(req,res){
	db.contribution.findOne({
		where: {id: req.params.id},
		include: [db.tag]
	}).then(function(contribution){
		res.render('contributions/single', {result: contribution});	
	})
})

module.exports = router;
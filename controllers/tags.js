var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var async = require('async');


router.get('/all', isLoggedIn, function(req,res){
	db.contribution.findAll({
		attributes: ['id'], 
		where: {userId: req.user.id}
	}).then(function(usersContribs){
		var contributionIds = usersContribs.map(function(item){
			return item.id;
		});

		db.contribution_tag.findAll({
			where: {contributionId: contributionIds}
		}).then(function(tags){
			var tagIds = tags.map(function(item){
				return item.tagId;
			});

			db.tag.findAll({
				where: {id: tagIds}
			}).then(function(tags){
				res.render('tags/all', {tags: tags})
			});
		});
	});
});


router.get('/:id', isLoggedIn, function(req, res){
	db.contribution_tag.findAll({
		attributes: ['contributionId'], 
		where: {tagId: req.params.id}
	}).then(function(contributions){
		var contributionIds = contributions.map(function(item){
			return item.contributionId;
		});
		console.log('contributionIds', contributionIds);
		db.contribution.findAll({
			where: {id: contributionIds}
		}).then(function(contributions){
			console.log(contributions);
			res.render('tags/single', {contributions: contributions})
		});
		
		//res.render('tags/single', {tag: tag});
	});
})

module.exports = router;
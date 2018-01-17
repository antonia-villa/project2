var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var async = require('async');

// Select all data tags on users contributions
router.get('/all', isLoggedIn, function(req,res){
	// Select users contributions
	db.contribution.findAll({
		attributes: ['id'], 
		where: {userId: req.user.id}
	}).then(function(usersContribs){
		var contributionIds = usersContribs.map(function(item){
			return item.id;
		});
		// Retrieve contribution data tags
		db.contribution_tag.findAll({
			where: {contributionId: contributionIds}
		}).then(function(tags){
			var tagIds = tags.map(function(item){
				return item.tagId;
			});
			// Retrieve all data tags
			db.tag.findAll({
				where: {id: tagIds}
			}).then(function(tags){
				res.render('tags/all', {tags: tags})
			});
		});
	});
});

// Select all contributions associated to tags
router.get('/:id', isLoggedIn, function(req, res){
	db.contribution_tag.findAll({
		attributes: ['contributionId'], 
		where: {tagId: req.params.id}
	}).then(function(contributions){
		var contributionIds = contributions.map(function(item){
			return item.contributionId;
		});
		db.contribution.findAll({
			where: {id: contributionIds}
		}).then(function(contributions){
			res.render('tags/single', {contributions: contributions})
		});
	});
})

module.exports = router;
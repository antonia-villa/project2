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
		console.log(contributionIds);

		db.contribution_tag.findAll({
			where: {contributionId: contributionIds}
		}).then(function(tags){
			console.log(tags);
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


router.get('/:id', function(req, res){
	db.tag.find({
		where:{id: req.params.id},
		include: [db.contribution]
	}).then(function(tag){
		res.render('tags/single', {tag: tag});
	});
})

module.exports = router;
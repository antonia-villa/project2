var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');


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

//res.status(status).send(body)
router.post('/', function(req, res){
	var tags = req.body.tags.split(',');

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

router.get('/:id', function(req,res){
	db.contribution.findOne({
		where: {id: req.params.id},
		include: [db.tag]
	}).then(function(contribution){
		res.render('contributions/single', {result: contribution});	
	})
})

module.exports = router;
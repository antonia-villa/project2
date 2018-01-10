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

//res.status(status).send(body)
router.post('/', function(req, res){
	var tags = [];

	if(req.body.tags){
		tags = req.body.tags.split(',');
	}

	db.article.create(req.body).then(function(createdArticle){
		if(tags.length > 0){
			async.forEach(tags, function(t, callback){
				// Add tag to the tag table
				db.tag.findOrCreate({
					where: {content: t.trim()}
				}).spread(function(tag, wasCreated){
					if(tag){
						// This part is what adds the relationship in the join table
						createdArticle.addTag(tag);
					}
					// Calling this function is like saying this is done/resolved
					callback();
				})

			}, function(){
				// Happens when ALL calls are resolved
				res.redirect('/articles/' + createdArticle.id);
			});

		}
		else {
			res.redirect('/articles/' + createdArticle.id);
		}
	}).catch(function(err){
		console.log('error', err);
		res.send('uh oh!', err);
	});
})

module.exports = router;
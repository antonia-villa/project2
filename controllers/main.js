var express = require("express");
var db = require("../models");
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');


router.get('/profile', isLoggedIn, function(req,res){
	res.render('main/profile');
});


module.exports = router;
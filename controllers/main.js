var express = require("express");
var db = require("../models");
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');


router.get('/', isLoggedIn, function(req,res){
	res.render('main/index');
});


module.exports = router;
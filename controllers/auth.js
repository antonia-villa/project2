var express = require("express");
var passport = require("../config/passportConfig");
var db = require("../models");
var router = express.Router();

router.get("/login", function(req, res){
	res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/main/profile",
	successFlash: "Login Successful",
	failureRedirect: "/auth/login",
	failureFlash: "Invalid Credentials. Try again."
}));

router.get("/signup", function(req, res){
	res.render("auth/signup");
})

router.post("/signup", function(req, res, next){
	db.user.findOrCreate({
		where: {email: req.body.email},
		defaults: {
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){
		if(wasCreated){
			passport.authenticate("local", {
				successRedirect: "/main/profile",
				successFlash: "Log in was successful!"
			})(req, res, next);
		}
		else {
			req.flash("error", "Sorry - the email already exists.");
			res.redirect("/auth/login");
		}
	}).catch(function(err){
		req.flash("error", err.message);
		res.redirect("/auth/signup");
	});
});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "logged out!");
	res.redirect("/");
})

module.exports = router;
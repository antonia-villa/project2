// Require packages
require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var moment = require('moment');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var app = express();
var path = require('path');

// Initialize Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});
app.use(function(req,res,next){
	res.locals.moment = moment;
	next();
});

// Set up controllers
app.use('/auth', require('./controllers/auth'));
app.use('/main', require('./controllers/main'));
app.use('/contributions', require('./controllers/contributions'));
app.use('/tags', require('./controllers/tags'));
app.use('/visuals', require('./controllers/visuals'));

app.use(express.static(path.join(__dirname, '/public')));


app.get('/', function(req, res){
	res.render('home');
});

app.listen(process.env.PORT || 3000);




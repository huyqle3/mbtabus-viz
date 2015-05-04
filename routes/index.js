var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Use passport
module.exports = function(passport){
	
	/* GET Login page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Login', message: req.flash('loginMessage') });
	});

	router.get('/login', function(req, res){
		res.redirect('/');	
	});

	/* Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect:'/buses',
		falureRedirect:'/login',
		falureFlash : true
	}));

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* GET Home Page */
	router.get('/buses', isLoggedIn, function(req, res){
		res.render('buses', {user: req.user });
	});

	return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

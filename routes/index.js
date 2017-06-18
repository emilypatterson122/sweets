var express = require('express');
var router = express.Router();
var Dessert = require('../models/dessert'); 
var Comment = require('../models/comment');
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function isLoggedIn(req, res, next) {
    // console.log(req);
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
}

//Root- dash page
router.get('/', function (req, res, next) {
    res.render('home');
});
//Reg form
router.get('/register', function (req, res, next) {
    res.render('register', {user: req.user});
});
//Login form
router.get('/login', function (req, res, next) {
    res.render('login');
});
//Logout
router.get('/logout', function (req, res, next) {
    var name = req.user.username;
    console.log(name + " has logged out.")
    req.logout();
    res.redirect('/login');
});

//Register new user
router.post('/register', function (req, res, next) {
    //passport-local-mongoose: Check if username is unique
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.error(err);
            res.redirect('/register');
        }
        // login user after successful registration
        passport.authenticate('local')(req, res, function () {
            console.log(req.user.username + " has logged in.")
            res.redirect('/desserts');
        }); 
    });
});

//Login registered user
router.post('/login', passport.authenticate('local', {
    successRedirect: '/desserts'
    , failureRedirect: '/login'
}));

module.exports = router;

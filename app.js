var express = require('express');
var methodOverride = require('method-override');
var app = express();
var bodyParser = require('body-parser');
// var seedDB = require('./seeds.js'); 
// seedDB();
var mongoose = require('mongoose');
var db = mongoose.connection;
var Dessert = require('./models/dessert'); 
var Comment = require('./models/comment');
var User = require('./models/user');
//var Recipe = require('./models/recipe');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

mongoose.connect('mongodb://localhost/project');

app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
})); 
app.use(methodOverride('_method')) //https://github.com/expressjs/method-override
app.use(express.static(__dirname + "/public")) 
app.use(require('express-session')({
    secret: 'blah'
    , resave: false
    , saveUninitialized: false
}));
app.use(passport.initialize()); 
app.use(passport.session()); 
//passport config
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//Global variable for accessing user
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    console.log(req.user);
    next();
});

//Require routes
var dessertRoutes = require('./routes/desserts');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');
//var recipeRoutes = require('./routes/recipes');
//Use routes
app.use("/desserts", dessertRoutes);
app.use("/desserts/:id/comments", commentRoutes);
app.use(indexRoutes);
//app.use("/desserts/:id/recipes", recipeRoutes);

//Express port
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listening on port 3000!');
});

module.exports = 'app.js';


// Requirements 
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
// Reads post request body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Require seedDB function
var seedDB = require('./seeds.js'); 
seedDB();


// MONGOOSE AND MONGO 
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/project'); //set up DB
var db = mongoose.connection;

// Model- object that gives you access to a named collection
var Dessert = require('./models/dessert'); 
var Comment = require('./models/comment'); 

// ROUTES 
// Root
app.get('/', function(req, res){
  res.render('landing');
});

// Display all desserts
app.get('/desserts', function(req, res){
	Dessert.find(function(err, dessertsX){ //like 'db.desserts.find()' in Mongo
		if(err){
			console.log(err);
		} else {
			res.render('index', {desserts: dessertsX}); //first "desserts" matches <% desserts.forEach %> in index.ejs
		}
	})
});// the argument is representing "all the data returned from mongo", so the index page receives the data in the form shown in the render statement.

// Form to create new dessert
app.get('/desserts/new', function(req, res){
	res.render('new');
});

// http://stackoverflow.com/questions/39782972/display-all-comments-for-each-post-with-expressjs-and-mongoose

// http://mongoosejs.com/docs/api.html#model_Model.populate


// Display SINGLE DESSERT- refer to: https://www.mongodb.com/blog/post/the-mean-stack-mistakes-youre-probably-making
app.get('/desserts/:id',function(req, res){
   Dessert.findOne({'_id': req.params.id})
   	.populate('comments')
   	.exec(function(err, blah){
       if(err){
       		console.log(err);
         	res.send('No find blah blah blah');
       } else {
   			res.render('show.ejs',{dessert: blah});
       } 
       console.log(blah);
   })
});

// Post created-dessert to display-all-desserts page
app.post('/desserts', function(req, res){
	Dessert.create( //.create = .new and .save
	{ name: req.body.newDessertName, image: req.body.newDessertImage, description: req.body.newDessertDescription }, //data that's saving in DB
	function(err, dessert){
		if(err){
			console.log(err);
		} else {
			// console.log(dessert);
			res.redirect('/desserts'); //redirect is also a GET request!
		}
	})
});

// Express port
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listening on port 3000!');
});

module.exports = 'app.js';




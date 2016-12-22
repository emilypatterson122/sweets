var express = require('express');
var app = express();
var ejs = require('ejs');
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MONGOOSE AND MONGO // MONGOOSE AND MONGO // MONGOOSE AND MONGO // MONGOOSE AND MONGO
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var dessertSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var dessert = mongoose.model("dessert", dessertSchema);
var creamCake = new dessert({
	name: "Cream Cake",
	image: "http://i.imgtc.com/E95yksb.jpg"
});

// why is this saving more than once?
// creamCake.save(function(err){
// 	if(err) {
// 		console.log(err);
// 	} 
// 	else {
// 		console.log('boom');
// 	}
// });


// DUMMY INFO AND ROUTES // DUMMY INFO AND ROUTES // DUMMY INFO AND ROUTES 
// var desserts = [
//   {name: "Cream Cake", image: "http://i.imgtc.com/E95yksb.jpg"},
//   {name: "Red Velvet Cake", image: "http://i.imgtc.com/neag6Q4.jpg"},
//   {name: "White Chocolate", image: "http://i.imgtc.com/D9CY418.jpg"}
// ];

app.get('/', function(req, res){
  res.render('landing');
});

// uses static array
// app.get('/desserts', function(req, res){
//   res.render('desserts',
//     {desserts: desserts}
//   )
// });

// uses Mongo
app.get('/desserts', function(req, res){
	dessert.find(function(err, desserts){
		res.render('index', {desserts: desserts}); //where from now?
	})
});

app.get('/desserts/new', function(req, res){
	res.render('new');
});

app.get('/desserts/show', function(req, res){
	res.render('show');
});

// uses Mongo 
app.post('/desserts', function(req, res){
	// console.log('making it to post route'); //test
	// console.log(req.body); //test
	var newDessert = new dessert();
	newDessert.name = req.body.newDessertName;
	newDessert.image = req.body.newDessertImage;
	// console.log(newDessertName); //test
	// console.log(newDessertImage); //test
	newDessert.save(function(err, document){
		if(err){
			console.log("Error on save")
		} else {
			console.log(document);
			mongoose.model('dessert').find(function(err,desserts){
                res.render('index', {desserts: desserts}); //where from now?
            })
		}
	});
});

// uses Mongo -- this works -- why?
// app.post('/desserts', function(req,res){
//     var newDessertFromForm = new dessert();
//     newDessertFromForm.name = req.body.newDessertName;
//     newDessertFromForm.image = req.body.newDessertImage;
    
//     newDessertFromForm.save(function(err, document){
//         if(err){
//             res.send('Error saving dessert');
//         } else {
//             console.log(document);
//             mongoose.model('dessert').find(function(err,desserts){
//                 res.render('index',{desserts: desserts});
//             })
//         }
//     });
// });


var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});


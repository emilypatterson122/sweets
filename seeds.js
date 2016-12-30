var App = require('./app.js');
var DessertPage = require('./models/dessert.js'); 
var Dessert = require('./models/dessert'); 

var dessertArray = [
	{
		"name" : "Cream Cake",
		"image" : "http://i.imgtc.com/E95yksb.jpg",
		"description" : "Delicate and delicious!"
	},
	{
		"name" : "Red Velvet Cake",
		"image" : "http://i.imgtc.com/neag6Q4.jpg",
		"description" : "Classic, heart-warming."
	},
	{
		"name" : "White Chocolate 1",
		"image" : "http://i.imgtc.com/D9CY418.jpg",
		"description" : "Of the 3, my 3rd option."
	},
	{
		"name" : "White Chocolate 2",
		"image" : "http://i.imgtc.com/D9CY418.jpg",
		"description" : "Of the 4, my 4th option."
	},
	{
		"name" : "White Chocolate 3",
		"image" : "http://i.imgtc.com/D9CY418.jpg",
		"description" : "Of the 5, my 5th option."
	}
];


var seedsDB = Dessert.remove({}, function(err, dessertArray){
	// console.log(dessertArray);
	if(err){
		console.log(err);
	} else {
		Dessert.create(dessertArray);
	}
});

module.exports = 'seeds.js';
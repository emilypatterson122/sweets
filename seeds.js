var mongoose = require('mongoose'); 
var Dessert = require('./models/dessert'); 
var Comment = require('./models/comment');

// dessert data 
var dessertArray = [
	{
		name 		: "Cream Cake",
		image 		: "http://i.imgtc.com/E95yksb.jpg",
		description : "Delicate and delicious!"
	},
	{
		name 		: "Red Velvet Cake",
		image		: "http://i.imgtc.com/neag6Q4.jpg",
		description : "Classic, heart-warming."
	},
	{
		name 		: "White Chocolate",
		image 		: "http://i.imgtc.com/D9CY418.jpg",
		description : "Good for a bit, then move on. Real talk."
	},
	{
		name 		: "Lemon Meringue Pie",
		image 		: "http://www.seriouseats.com/recipes/assets_c/2011/12/20111205-182838-lemon-meringue-610x458-1-thumb-625xauto-205852.jpg",
		description : "Favorite. Ever."
	}
];

function seedDB() {
	Comment.remove({}, function(err){ //each time run, remove comments from collection
		if(err){
			console.log(err);
		} else {
			console.log('removed comments');
		}
	})
	Dessert.remove({}, function(err, next){ //each time run, remove desserts from collection
	 	if(err){
	 		console.log(err); 
	 	} else {
	 		console.log("removed desserts");
	 		next;
	 	}
 	})
 	dessertArray.map(function(dessertX){ //each time run, put dessert in
		// console.log(dessert);
		Dessert.create(dessertX, function(err, dessert){ //dessert data that comes back once saved in db
			if(err){
				console.log(err);
			} else {
				console.log(dessert); //shows what was saved to db
				var commentTest = 
					{
						author	: "Harriett",
						comment	: "Wow, I gotta try that!"
					};
				
				Comment.create(commentTest, function(err, comment){ //each time run, put comments in
					if(err){
						console.log(err);
					} else {
						// console.log(comment);
						dessert.comments.push(comment); //comment that was successfully saved to db
						dessert.save(comment, function(err){ //save to dessert collection
							if(err){
								console.log(err);
							} else {
								console.log("Seeded id!");
							}
						});
					}		
				})
			}
		})
	})
};

module.exports = seedDB;

//similar project, no seeds file representation: 
// http:stackoverflow.com/questions/35074133/mongoose-node-error-cannot-read-property-objectid-of-undefined

// http:codereview.stackexchange.com/questions/42171/seeding-mongodb-using-mongoose-models

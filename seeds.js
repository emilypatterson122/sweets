var mongoose = require('mongoose');
var Dessert = require('./models/dessert');
var Comment = require('./models/comment');
// dessert data 
var dessertArray = [
    {
        name: "Cream Cake"
        , image: "http://i.imgtc.com/E95yksb.jpg"
        , description: "Delicate and delicious! More text here and here and here. More text here and here and here. More text here and here and here. More text here and here and here. More text here and here and here. More text here and here and here. More text here and here and here."
	}
    , {
        name: "Red Velvet Cake"
        , image: "http://i.imgtc.com/neag6Q4.jpg"
        , description: "Classic, heart-warming. More text here and here and here.More text here and here and here.More text here and here and here."
	}
    , {
        name: "White Chocolate"
        , image: "http://i.imgtc.com/D9CY418.jpg"
        , description: "Good for a bit, then move on. Real talk. More text here and here and here.More text here and here and here.More text here and here and here."
	}
    , {
        name: "Lemon Meringue Pie"
        , image: "http://www.villageinn.com/i/pies/profile/lemonmeringue_main1.jpg"
        , description: "This is one of the easiest and delicious recipes I\'ve ever tried. But you do have to have the right equipment. Meringue is a beast if you don\'t have a mixer haha"
	}
    , {
        name: "Mint Chocolate Ice Cream Cake"
        , image: "http://www.goldmedalflour.com/-/media/Images/Gold-Medal-Flour/Blog/Mint%20Chocolate%20Chip%20Ice%20Cream%20Cake/Mint%20Chocolate%20Chip%20Ice%20Cream%20Cake%205.jpg"
        , description: "This is hard to make, but if you have the time it IS IT'S OWN REWARD."
	}
    , {
        name: "Blueberry Cobbler"
        , image: "http://wickedgoodkitchen.com/wp-content/uploads/2013/06/Best-Ever-Blueberry-Cobbler-3.jpg"
        , description: "This is ususally a (Fall) seasonal thing for me, but I got a craving. Worth it."
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
    Dessert.remove({}, function (err, next) { //each time run, remove desserts from collection
        if (err) {
            console.log(err);
        }
        else {
            console.log("removed desserts");
            next;
        }
    })
    dessertArray.map(function (dessertX) { //each time run, put dessert in
        // console.log(dessert);
        Dessert.create(dessertX, function (err, dessert) { //dessert data that comes back once saved in db
            if (err) {
                console.log(err);
            }
            else {
                // console.log(dessert); //shows what was saved to db
                var commentTest = {
                    author: "Harriett"
                    , comment: "Wow, I gotta try that!"
                };
                Comment.create(commentTest, function (err, comment) { //each time run, put comments in 
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // console.log(comment);
                        dessert.comments.push(comment); //comment that was successfully saved to db
                        dessert.save(comment, function (err) { //save to the dessert that's passed
                            if (err) {
                                console.log(err);
                            }
                            else {
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
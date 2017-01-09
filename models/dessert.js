var mongoose = require('mongoose'); //import Mongoose methods

// Schema- defines the structure of any documents that will be stored in MongoDB collection
var dessertSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] 
}); //comment sructure from: http://mongoosejs.com/docs/populate.html

Dessert = mongoose.model('Dessert', dessertSchema);

module.exports = Dessert;


/* The 'Schema.Types.ObjectId' indicates that the value for Comment is 
going to be a MongoDB unique identifier and the ref key alerts 
Mongoose what model to use when this value is populated from the 
database.*/

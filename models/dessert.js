// var App = require('./views/app.js');
var mongoose = require('mongoose'); //import Mongoose methods

// Schema- defines the structure of any documents that will be stored in MongoDB collection
var dessertSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

module.exports = mongoose.model('Dessert', dessertSchema);

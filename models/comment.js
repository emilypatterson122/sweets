var mongoose = require('mongoose'); //import Mongoose methods

// Schema- defines the structure of any documents that will be stored in MongoDB collection
var commentSchema = new mongoose.Schema({
	author: String,
	comment: String
}); 

Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
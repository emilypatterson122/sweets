var mongoose = require('mongoose'); 
var commentSchema = new mongoose.Schema({
    comment: String, 
    author: {
    	username: String,
 		id: {
 			type: mongoose.Schema.Types.ObjectId,
 			ref: 'User'
 		} 
    } 
});
Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

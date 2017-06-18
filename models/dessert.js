var mongoose = require('mongoose'); 

var dessertSchema = new mongoose.Schema({
    name: String, 
    image: String, 
    description: String, 
    submittedBy: {
    	username: String,
    	id: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: 'User'
    	}
    }, 
    comments: [{ //one dessert may have many comments
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}); //comment sructure from: http://mongoosejs.com/docs/populate.html
Dessert = mongoose.model('Dessert', dessertSchema);
module.exports = Dessert;

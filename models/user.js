var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    passportLocalMongoose = require('passport-local-mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    comment: {
    	type: mongoose.Schema.Types.ObjectId, 
    	ref: 'Comment'
    }
    //pwd created by combining the password provided by the user and the salt, and then applying one-way encryption
    //salt string of characters unique to each user
});
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username'
});
var User = mongoose.model('User', userSchema);
module.exports = User;
//storing a password’s hash and salt will allow app to authenticate users 
//without needing to store their passwords in the database.

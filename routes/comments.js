var express = require('express');
var router = express.Router({mergeParams: true});
var Dessert = require('../models/dessert'); 
var Comment = require('../models/comment'); 

//New comment
router.get('/new', isLoggedIn, function (req, res, next) {
    console.log(req.params.id); //return dessert id
    Dessert.findById(req.params.id, function (err, dessertData) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(dessertData);                        
            res.render('comments/new', {reqBody: dessertData}); 
        }
    })
});

//Form to edit commment
router.get('/:commentid/edit', function(req, res){
    //console.log(req.params);
    Comment.findById(req.params.commentid, function(err, commentData){
        if(err){
            console.log(err);
        } else {
            //console.log(commentData);
            res.render('comments/edit', {comment: commentData, requestAll: req.params});
        }
    })
}); 

//Post a comment for single dessert
router.post('/', function (req, res, next) {
    //console.log(req.params.id); 
    Dessert.findById(req.params.id, function (err, dessert) { 
        if (err) {
            console.log(err);
        }
        else {
            //console.log(dessert); 
            var commentTest = {
                comment: req.body.newCommentText,
                author: {
                    username: req.user.username,
                    id: req.user.id
                }
            };
            Comment.create(commentTest, function (err, comment) { 
                if (err) {
                    console.log(err);
                }
                else {
                    //console.log(comment);
                    dessert.comments.push(comment);
                    dessert.save(comment, function (err) { 
                        console.log(comment);
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.redirect('/desserts/' + req.params.id);
                        }
                    });
                }
            })
        }
    })
});

//Update a comment 
router.put('/:commentid', checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentid, {comment: req.body.editCommentText}, function(err){
        //console.log(req.body.editCommentText);
        if (err){
            console.log(err);
        } else {
            console.log('Comment updated!');
            res.redirect('/desserts/' + req.params.id);
        }
    })
});

//Delete a comment
router.delete('/:commentid', checkCommentOwnership, function(req, res, next){
    Comment.findByIdAndRemove(req.params.commentid, function(err, comment){
        if(err){
            console.log(err);
        } else {
            console.log("Comment deleted!");
            res.redirect('/desserts/' + req.params.id);
        }
    });
});

//Check authentication before someone can create a comment
function isLoggedIn(req, res, next) {
    //console.log(req);
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
};

//Authorize permission to edit/delete comment post ONLY if currentUser == author
function checkCommentOwnership(req, res, next){
    if (req.isAuthenticated()) {                        
        console.log('User authenticated'); 
        Comment.findById(req.params.commentid, function(err, commentData){
            //console.log(commentData); 
            var currentUser = req.user.id;
            //console.log("This is the currentUser id: " + currentUser); 
            var author = commentData.author.id;
            //console.log("This is the author id: " + author); 
                if(currentUser == author){   //MISFIRES WITH ===
                    console.log("The currentUser is the author.");
                    return next(); 
                } else {
                    console.log("The currentUser is not the author."); 
                }
        })
    } else {
        console.log("User is not authorized permission to edit this comment.");
        res.redirect('/login');
    }    
};

module.exports = router;


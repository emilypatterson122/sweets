
var express = require('express');
var methodOverride = require('method-override');
var router = express.Router();
var Dessert = require('../models/dessert'); 

//Display all desserts
router.get('/', function (req, res, next) {
    Dessert.find(function (err, dessertData) { 
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            res.render('desserts/index', {desserts: dessertData}); 
        } 
    })
});

//Form to create new dessert
router.get('/new', isLoggedIn, function (req, res, next) {
    res.render('desserts/new');
});

//Display SINGLE DESSERT                                    
router.get('/:id', function (req, res, next) {
    //console.log(req.params.id);
    Dessert.findById(req.params.id) 
        .populate('comments')
        .exec(function (err, dessertData) { 
            if (err) {
                console.log(err);
            }
            else {
                //console.log(dessertData);
                res.render('desserts/show', {dessert: dessertData});
            }
        })
});

//Form to edit a dessert
router.get('/:id/edit', checkDessertOwnership, function(req, res, next){
    Dessert.findById(req.params.id, function (err, dessertData) { 
        if (err) {
            console.log(err);
        }
        else {
            console.log(dessertData);
            res.render('desserts/edit', {dessert: dessertData});
        }
    })
});


//Post created-dessert to display-all-desserts 
router.post('/', function (req, res, next) {
    //.create = .new and .save
    //below data that's saving in DB
    Dessert.create({
            name: req.body.newDessertName, 
            image: req.body.newDessertImage, 
            description: req.body.newDessertDescription, 
            submittedBy: { //display user's username along with the dessert they post
                username: req.user.username,
                id: req.user.id} 
            }, function (err, dessert) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(dessert);
            res.redirect('/desserts'); 
        }
    })
});

//Edit SINGLE DESSERT
router.put('/:id', function(req, res, next){
    Dessert.findById(req.params.id, function(err, dessert){
        if(err){
            console.log(err);
        } else {
            //edit dessert info
            dessert.name = req.body.editDessertName; 
            dessert.image = req.body.editDessertImage; 
            dessert.description = req.body.editDessertDescription; 
            //save edited dessert info to db
            dessert.save(function(err){
                if(err){
                    console.log(err);
                } else {
                    //console.log('Dessert updated!');
                    res.redirect('/desserts/' + req.params.id);
                }
            })
        }
    })
});

//Delete SINGLE DESSERT
router.delete('/:id', checkDessertOwnership, function(req, res, next){
    Dessert.findByIdAndRemove(req.params.id, function(err, dessert){
        if(err){
            console.log(err);
        } else {
            //console.log("Dessert deleted!");
            res.redirect('/desserts');
        }
    });
});

//Check authentication before someone can create new dessert
function isLoggedIn(req, res, next){
    //console.log(req);
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
}

//Authorize permission to edit/delete dessert post ONLY if currentUser == submitter
function checkDessertOwnership(req, res, next){
    if (req.isAuthenticated()) {                        
        console.log('User authenticated'); 
        Dessert.findById(req.params.id, function(err, dessertData){
            //console.log(dessertData); 
            var currentUser = req.user.id;
            //console.log("This is the currentUser id: " + currentUser); 
            var submitter = dessertData.submittedBy.id;
            //console.log("This is the submitter id: " + submitter); 
                if(currentUser == submitter){   //MISFIRES WITH ===
                    console.log("The currentUser is the submitter.");
                    return next(); 
                } else {
                    console.log("The currentUser is not the submitter."); 
                }
        })
    } else {
        console.log("User is not authorized permission to edit this dessert.");
        res.redirect('/login');
    }    
}

module.exports = router;
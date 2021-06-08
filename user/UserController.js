var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// Create a new user
router.post('/', function(req, res){
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    },
    function (err, user){
        if (err) return res.status(500).send("There was a problem adding the information to the database");
        res.status(200).send(user);
    });
});

// Returns all the users in the database
router.get('/', function(req, res){
    User.find({}, function(err, users){
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users)
    });
});

// Returns a single user in the databse
router.get('/:id', function(req, res){
    User.findById(req.params.id, function (err, user){
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// Delete a single user from database
router.delete('/:id', function(req, res){
    User.findByIdAndDelete(req.params.id, function(err, user){
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User " + user.name + " was deleted.");
    });
});

// Updates a single user in database
router.put('/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user){
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

// Export router 
module.exports = router;
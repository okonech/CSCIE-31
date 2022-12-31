var UserModel = require('../models/UserModel');
var DeckModel = require('../models/DeckModel');

var userController = {};

// GET List of users
userController.list = function(req, res) {
    UserModel.find({})
        .then((users) => {
            res.render('users', {
                users: users
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// POST Create new user, happens through the get request for a user
userController.create = function(req, res) {
    // just redirect on existing user
    UserModel.findOne({'name': req.body.user})
        .then((user) => {
            if (!user) {
                var user = new UserModel({
                    name: req.body.user,
                    dateCreated: new Date(),
                    decks:[]
                });
                user.save();
                console.log("Saved" + user);
            }
        })
        .then(() => {
            console.log("create user - redirecting to " + req.body.user);
            res.redirect('/users/'+req.body.user);
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET Read user data and redirect to user page
userController.read = function(req, res) {
    UserModel.findOne({'name': req.params.user})
        .then((user) => {
            if(user) {
                console.log("Reading user");
                DeckModel.find({'owner': req.params.user})
                    .then((decks) => {
                        res.render('user', {
                            user: user.name,
                            createdDate: user.dateCreated,
                            decks: decks
                        });
                    });
            } else {
                // user not found, have app redirect to 404 page
                res.redirect('../notfound');
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect('../notfound');
        });
};

module.exports = userController;
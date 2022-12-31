var UserService = require('../services/UserService');

var userController = {};

// GET List of users
userController.list = function(req, res) {
    UserService.list({})
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
    UserService.create({
        name: req.body.user,
        dateCreated: new Date(),
        decks:[]
    })
        .then((user) => {
            console.log("create user - redirecting to " + user.name + " " + user._id);
            res.redirect('/users/'+user._id);
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET Read user data and redirect to user page
userController.read = function(req, res) {
    UserService.read(req.params.user)
        .then((userMeta) => {
            res.render('user', {
                user: userMeta.user,
                createdDate: userMeta.user.dateCreated,
                decks: userMeta.decks
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('../notfound');
        });
};

module.exports = userController;
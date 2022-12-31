var UserModel = require('../models/UserModel');
var DeckModel = require('../models/DeckModel');

var UserService = {};

// GET List of users
UserService.list = function(searchParams) {
    return UserModel.find(searchParams)
        .then((users) => {
            return users;
        })
        .catch((err) => {
            throw err;
        });
};

// CREATE a new user and return it
UserService.create = function(userObject) {
    // do not overwrite an existing user
    // user names are unique in this model
    return UserModel.findOne({'name': userObject.name})
        .then((user) => {
            // execute save promise immediately or return found object
            if (!user) {
                console.log("Saved" + user);
                return new UserModel(userObject).save();
            } else {
                return user;
            }
        })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            throw err;
        });
};

// READ a single user and return an object of {user, [decks owned]}
UserService.read = function(userID) {
    var returnUser;
    return UserModel.findOne({_id: userID})
        .then((user) => {
            returnUser = user;
            console.log("Reading user" + user);
            return DeckModel.find({'owner': user.name});
        })
        .then((decks) => {
            return {
                user: returnUser,
                decks: decks
            }
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = UserService;
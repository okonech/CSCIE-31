var express = require('express');
var router = express.Router();
var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // route to user
    if (req.query.user) {
        // log local username
        app.locals[req.session.id] = req.query.user;
        // init object
        if (!app.locals.users)
            app.locals.users = {};
        // set phone array for user list
        if (!app.locals.users[req.query.user])
            app.locals.users[req.query.user] = [];
        res.redirect('/users/' + req.query.user);
    } else {
        // render list of users
        res.render('users', {
            title: 'List of users',
            loginUser: app.locals[req.session.id],
            users: app.locals.users
        });
    }
});

/* GET user phones listing. */
router.get('/:user', function(req, res, next) {
    // store saved phone info to app locals if any
    if (req.query.model || req.query.capacity || req.query.color) {
        // add phone data
        app.locals.users[req.params.user].push([req.query.model, req.query.capacity, req.query.color]);
    }
    // render list of user's phones
    res.render('user', {
        title: 'List of phones',
        loginUser: app.locals[req.session.id],
        viewUser: req.params.user,
        viewPhones: app.locals.users[req.params.user]
    });
});

module.exports = router;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// session log for following current user
app.use(session({
    secret: 'assignment 3 secret',
    resave: false,
    saveUninitialized: true,
}));

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// router of no url to main index view
app.use('/', index);
// router of /users to users view
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404);
    // redirect to an html page
    res.redirect('404Page.html');
});


module.exports = app;
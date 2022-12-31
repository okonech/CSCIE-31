var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');
var decks = require('./routes/decks');


// connect to mongodb atlas
var uri = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PWD
    + "@cluster0-shard-00-00-ahqpa.mongodb.net:27017,cluster0-shard-00-01-ahqpa.mongodb.net:27017,cluster0-shard-00-02-ahqpa.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
mongoose.connect(uri)
    .then(()=> {console.log('DB Connected');})
    .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse form data
app.use(bodyparser.urlencoded({extended: false}));

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// router of no url to main index view
app.use('/', index);
// router of /users to users view
app.use('/users', users);
// router of /decks to decks view
app.use('/decks', decks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404);
    // redirect to an html page
    res.redirect('404Page.html');
});


module.exports = app;
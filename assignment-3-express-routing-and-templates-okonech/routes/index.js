var express = require('express');
var router = express.Router();
var app = express();

/* GET home page and login. */
router.get('/', function(req, res, next) {
    // render main login screen
    res.render('index', {
        title: 'CSCIE31 Assignment 3'
    });
});

module.exports = router;
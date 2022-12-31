var express = require('express');
var router = express.Router();
var app = express();

/* GET home page and login. */
router.get('/', function(req, res) {
    // render main login screen
    res.render('index', {
        title: 'CSCIE31 Assignment 5'
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();

// load controller for users
var UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/', UserController.list);

/* POST Single user to DB if it doesn't exist, route to user if already existing*/
router.post('/create', UserController.create);

/* GET Single user page */
router.get('/:user', UserController.read);

module.exports = router;
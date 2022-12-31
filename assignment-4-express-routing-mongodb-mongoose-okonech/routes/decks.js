var express = require('express');
var router = express.Router();

// load controller for decks
var DeckController = require('../controllers/DeckController');

/* GET decks listing. */
router.get('/', DeckController.list);

/* POST Single deck to DB*/
router.post('/create', DeckController.create);

/* GET Single deck page */
router.get('/:deckid', DeckController.read);

/* POST Single deck update */
router.post('/update/:deckid', DeckController.update);

/* GET Single deck delete */
router.get('/delete/:deckid', DeckController.delete);

module.exports = router;
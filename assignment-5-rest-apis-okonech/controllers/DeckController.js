var DeckService = require('../services/DeckService');
var DeckController = {};

// GET List of decks
DeckController.list = function(req, res) {
    DeckService.list({})
        .then((decks) => {
            res.render('decks', {
                decks: decks
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// POST Create new deck, happens through a user's new deck post
DeckController.create = function(req, res) {
    DeckService.create({
        name: req.body.name,
        commander: req.body.commander,
        owner: req.body.owner,
        ownerID: req.body.ownerID,
        dateCreated: new Date(),
        cards: []
    })
        .then(() => {
            res.redirect('/users/'+req.body.ownerID);
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET Read user data and redirect to user page
DeckController.read = function(req, res) {
    DeckService.read(req.params.deckid)
        .then((deck) => {
            res.render('deck_edit', {
                deck: deck
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('../notfound');
        });
};

// POST Update deck and redirect to decks list
DeckController.update = function(req, res) {
    DeckService.update(
        req.params.deckid,
        {
            name:req.body.name,
            commander: req.body.commander,
            owner: req.body.owner
        }
    )
        .then((deck) => {
            res.redirect('../');
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET Delete deck and redirect to decks list
DeckController.delete = function(req, res) {
    DeckService.delete(req.params.deckid)
        .then((deck) => {
            console.log("Deleted" + deck);
            res.redirect('../');
        })
        .catch((err) => {
            console.log(err);
        });
};


module.exports = DeckController;
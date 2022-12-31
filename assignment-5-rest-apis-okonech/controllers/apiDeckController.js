var DeckService = require('../services/DeckService');
var apiDeckController = {};

// GET List of decks
apiDeckController.list = function(req, res) {
    DeckService.list({})
        .then((decks) => {
            res.status(200);
            res.json(decks);
        })
        .catch((err) => {
            apiDeckController.error(err,res);
        });
};

// POST Create new deck, happens through a user's new deck post
apiDeckController.create = function(req, res) {
    DeckService.create({
        name: req.body.name,
        commander: req.body.commander,
        owner: req.body.owner,
        ownerID: req.body.ownerID,
        dateCreated: new Date(),
        cards: []
    })
        .then((deck) => {
            res.status(201);
            res.json(deck);
        })
        .catch((err) => {
            apiDeckController.error(err,res);
        });
};

// GET Read user data and redirect to user page
apiDeckController.read = function(req, res) {
    DeckService.read(req.params.deckid)
        .then((deck) => {
            res.status(200);
            res.json(deck);
        })
        .catch((err) => {
            apiDeckController.error(err,res);
        });
};

// POST Update deck and redirect to decks list
apiDeckController.update = function(req, res) {
    DeckService.update(
        req.params.deckid,
        {
            name:req.body.name,
            commander: req.body.commander,
            owner: req.body.owner,
            ownerID: req.body.ownerID,
        }
    )
        .then((deck) => {
            res.status(200);
            res.json(deck);
        })
        .catch((err) => {
            apiDeckController.error(err,res);
        });
};

// GET Delete deck and redirect to decks list
apiDeckController.delete = function(req, res) {
    DeckService.delete(req.params.deckid)
        .then((deck) => {
            res.status(200);
            res.json(deck);
        })
        .catch((err) => {
            apiDeckController.error(err,res);
        });
};

// return error
apiDeckController.error = function(req, res) {
    console.log(err);
    res.status(500);
    res.send(JSON.stringify(err.message));
};

module.exports = apiDeckController;
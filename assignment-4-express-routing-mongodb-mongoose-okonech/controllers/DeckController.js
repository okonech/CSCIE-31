var DeckModel = require('../models/DeckModel');

var deckController = {};

// GET List of decks
deckController.list = function(req, res) {
    DeckModel.find({})
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
deckController.create = function(req, res) {
    var deck = new DeckModel({
        name: req.body.name,
        commander: req.body.commander,
        owner: req.body.owner,
        dateCreated: new Date(),
        cards:[]
    });
    deck.save()
        .then(() => {
            console.log("Saved" + deck);
            res.redirect('/users/'+req.body.owner);
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET Read user data and redirect to user page
deckController.read = function(req, res) {
    DeckModel.findOne({_id: req.params.deckid})
        .then((deck) => {
            if(deck) {
                console.log("Reading deck");
                res.render('deck_edit', {
                    deck: deck
                });
            } else {
                // user not found, have app redirect to 404 page
                res.redirect('../notfound');
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect('../notfound');
        });
};

// POST Update deck and redirect to decks list
deckController.update = function(req, res) {
    DeckModel.findByIdAndUpdate(
        req.params.deckid,
        {$set: {
            name:req.body.name,
            commander: req.body.commander,
            owner: req.body.owner
        }}
    )
        .then((deck) => {
            console.log("Updated" + deck);
            res.redirect('../');
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET Delete deck and redirect to decks list
deckController.delete = function(req, res) {
    DeckModel.findByIdAndRemove(req.params.deckid)
        .then((deck) => {
            console.log("Deleted" + deck);
            res.redirect('../');
        })
        .catch((err) => {
            console.log(err);
        });
};


module.exports = deckController;
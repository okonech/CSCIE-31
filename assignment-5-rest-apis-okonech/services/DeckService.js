var DeckModel = require('../models/DeckModel');

var DeckService = {};

// GET List of decks
DeckService.list = function(searchParams) {
    return DeckModel.find(searchParams)
        .then((decks) => {
            return decks;
        })
        .catch((err) => {
            throw err;
        });
};

// CREATE a new deck and return it
DeckService.create = function(deckObject) {
    var deck = new DeckModel(deckObject);
    return deck.save()
        .then((deck) => {
            console.log("Saved" + deck);
            return deck;
        })
        .catch((err) => {
            throw err;
        });
};

// READ a single deck
DeckService.read = function(deckID) {
    return DeckModel.findOne({_id: deckID})
        .then((deck) => {
            console.log("Reading deck" + deck);
            return deck;
        })
        .catch((err) => {
            throw err;
        });
};

// UPDATE a single deck and return it
DeckService.update = function(deckID, deckObject) {
    return DeckModel.findByIdAndUpdate(
        deckID,
        {$set: deckObject},
        // passed to return updated object
        {new: true}
    )
        .then((deck) => {
            console.log("Updated" + deck);
            return deck;
        })
        .catch((err) => {
            throw err;
        });
};

// DELETE a deck return it
DeckService.delete = function(deckID) {
    return DeckModel.findByIdAndRemove(deckID)
        .then((deck) => {
            console.log("Deleted" + deck);
            return deck;
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = DeckService;
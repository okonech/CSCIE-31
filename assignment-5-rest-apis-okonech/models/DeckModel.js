var mongoose = require('mongoose');

var DeckSchema = new mongoose.Schema({
    name: String,
    commander: String,
    owner: String,
    ownerID: String,
    dateCreated: Date,
    cards: [String]
});

module.exports = mongoose.model('Deck',DeckSchema);
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    dateCreated: Date,
    decks: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('User',UserSchema);
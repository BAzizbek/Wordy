const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    word: String,
    searchCount: { type: Number, default: 1 },
    lastSearch: { type: Date, default: Date.now },
    isFavourite: { type: Boolean, default: false },
});

module.exports = mongoose.model('Word', wordSchema);

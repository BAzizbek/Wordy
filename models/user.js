const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: false },
    email: { type: String, unique: true },
    lastLogin: { type: Date, default: Date.now },
    words: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
});

module.exports = mongoose.model('User', userSchema);

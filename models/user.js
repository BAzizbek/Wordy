const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: {type: Boolean, default: false},
  email: {type: String, unique: true},
  subs: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Channel'}]
});

module.exports = mongoose.model('User', userSchema)

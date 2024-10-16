const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tickets: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);

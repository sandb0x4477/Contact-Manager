const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  name: String,
  address: String,
  city: String,
  postcode: String,
  email: String,
  phone: String,
  photoUrl: String,
}, {
    timestamps: true
  });

module.exports = mongoose.model('Contact', ContactSchema);

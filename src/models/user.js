const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: {
    type: String,
    // required: true,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    trim: true,
    lowercase: true,
  },
  number: {
    type: String,
    // required: true,
  },
});

module.exports = User;

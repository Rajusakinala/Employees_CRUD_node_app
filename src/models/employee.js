const mongoose = require('mongoose');
const validator = require('validator');

const Employee = mongoose.model('Employee', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 25,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
});

module.exports = Employee;

/* eslint-disable import/no-extraneous-dependencies */
const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');
const validator = require('validator');

const userSchema = new moongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    min: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

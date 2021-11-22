const mongoose = require('mongoose');

const { isEmail } = require('validator');

// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    surname: {
      type: String,
    },

    lastname: {
      type: String,
    },

    email: {
      type: String,
      required: [true, 'please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'please enter a valid email'],
    },

    password: {
      type: String,
      required: [true, 'please enter a password'],
      minlength: [6, 'the password needs be be at least 6 characters'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

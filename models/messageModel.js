const mongoose = require('mongoose');
const validator = require('validator');

const MessageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'All the fields are required.'],
    },
    email: {
      type: String,
      required: [true, 'All the fields are required.'],
      validate: [validator.isEmail, 'Please provide valid email.'],
    },
    message: {
      type: String,
      required: [true, 'All the fields are required.'],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Messages', MessageSchema);

module.exports = Message;

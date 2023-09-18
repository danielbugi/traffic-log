const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;

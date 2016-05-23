var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  classColour: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['DPS', 'Healer', 'Tank'],
  }
});

module.exports = characterSchema;

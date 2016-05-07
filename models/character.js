var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  }
  type: {
    type: String,
    enum: ['DPS', 'Healer', 'Tank'],

  }
});

module.exports = mongoose.model('Character', characterSchema);

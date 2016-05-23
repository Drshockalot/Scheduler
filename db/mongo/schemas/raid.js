var mongoose = require('mongoose');

var raidSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bosses: {
    type: String,
    required: true
  }
});

module.exports = raidSchema;

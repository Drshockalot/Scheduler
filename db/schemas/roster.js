var mongoose = require('mongoose');

var rosterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'character'
  }]
});

module.exports = rosterSchema;

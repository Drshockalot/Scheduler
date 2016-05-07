var mongoose = require('mongoose');

var rosterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
  members: [{
    type: Schema.ObjectId,
    ref: 'character'
  }],

});

module.exports = mongoose.model('Roster', rosterSchema);

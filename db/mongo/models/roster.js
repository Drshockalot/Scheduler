var mongoose = require('mongoose');
var rosterSchema = require('../schemas/roster');

module.exports = mongoose.model('Roster', rosterSchema);

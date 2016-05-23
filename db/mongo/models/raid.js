var mongoose = require('mongoose');
var raidSchema = require('../schemas/raid');

module.exports = mongoose.model('Raid', raidSchema);

var mongoose = require('mongoose');
var characterSchema = require('../schemas/character');

module.exports = mongoose.model('Character', characterSchema);

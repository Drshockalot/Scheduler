var mongoose = require('mongoose');
var daySchema = require('../schemas/day');

module.exports = mongoose.model('Day', daySchema);

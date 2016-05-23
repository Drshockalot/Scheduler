var mongoose = require('mongoose');
var bossSchema = require('../schemas/boss');

module.exports = mongoose.model('Boss', bossSchema);

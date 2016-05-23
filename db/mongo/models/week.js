var mongoose = require('mongoose');
var weekSchema = require('../schemas/week');

module.exports = mongoose.model('Week', weekSchema);

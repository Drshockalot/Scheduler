var mongoose = require('mongoose');
var scheduleSchema = require('../schemas/schedule');

module.exports = mongoose.model('Schedule', scheduleSchema);

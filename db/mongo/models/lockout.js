var mongoose = require('mongoose');
var lockoutSchema = require('../schemas/lockout');

module.exports = mongoose.model('Lockout', lockoutSchema);

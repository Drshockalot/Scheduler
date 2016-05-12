var mongoose = require('mongoose');
var bossSchema = require('./boss');

var daySchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  dayOfTheWeek: {
    type: String,
    required: true
  },
  bosses: {
    type: [bossSchema],
    required: true
  }
});

module.exports = daySchema;

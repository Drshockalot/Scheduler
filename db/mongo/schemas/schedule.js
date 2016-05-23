var mongoose = require('mongoose');
var daySchema = require('./day');

var scheduleSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['DPS', 'Healer', 'Tank'],
    required: true
  },
  days: {
    type: [daySchema],
    required: false
  },
  raid: {
    type: mongoose.Schema.ObjectId,
    ref: 'raid',
    required: true
  },
  roster: {
    type: mongoose.Schema.ObjectId,
    ref: 'roster',
    required: true
  },
  hidden: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = scheduleSchema;

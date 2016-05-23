var mongoose = require('mongoose');

var lockoutSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  }
  hidden: {
    type: Boolean,
    required: true,
    default: false
  }
  schedules: [{
    type: mongoose.Schema.ObjectId,
    ref: 'schedule'
  }]
});

module.exports = lockoutSchema;

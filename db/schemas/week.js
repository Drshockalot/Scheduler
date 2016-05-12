var mongoose = require('mongoose');

var weekSchema = mongoose.Schema({
  startingDate: {
    type: Date,
    required: false
  },
  weekNo: {
    type: number,
    required: false
  },
  schedules: [{
    type: mongoose.Schema.ObjectId,
    ref: 'schedule'
  }]
});

module.exports = weekSchema;

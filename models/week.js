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
    type: Schema.ObjectId,
    ref: 'schedule',
    required: true
  }]
});

module.exports = mongoose.model('Week', weekSchema);

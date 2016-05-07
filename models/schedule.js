var mongoose = require('mongoose');

var scheduleSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['DPS', 'Healer', 'Tank'],
    required: true
  }
  raid: {
    type: Schema.ObjectId,
    ref: 'raid',
    required: true
  }
  roster: {
    type: Schema.ObjectId,
    ref: 'roster',
    required: true
  },
  hidden: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);

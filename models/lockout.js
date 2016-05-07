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
    type: Schema.ObjectId,
    ref: 'schedule',
    required: true
  }]
});

module.exports = mongoose.model('Lockout', lockoutSchema);

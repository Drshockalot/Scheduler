let Bookshelf = require('./../database').bookshelf;

require('./schedule');
require('./user_availability');
require('./raid_attendance');
var Raid_Week = Bookshelf.Model.extend({
  tableName: 'raid_week',
  hasTimestamps: true,
  schedules: function() {
    return this.hasMany('Schedule');
  },
  user_availability: function() {
    return this.hasMany('User_Availability');
  },
  raid_attendance: function() {
    return this.hasMany('Raid_Attendance');
  }
});

module.exports = Bookshelf.model('Raid_Week', Raid_Week);

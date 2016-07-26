let Bookshelf = require('./../database').bookshelf;

require('./boss');
require('./schedule_boss');
require('./raid_attendance');
var Raid = Bookshelf.Model.extend({
  tableName: 'raid',
  hasTimestamps: true,
  bosses: function() {
    return this.hasMany('Boss');
  },
  schedule_bosses: function() {
    return this.hasMany('Schedule_Boss');
  },
  raid_attendance: function() {
    return this.hasMany('Raid_Attendance');
  }
});

module.exports = Bookshelf.model('Raid', Raid);

let Bookshelf = require('./../database').bookshelf;

require('./character');
require('./schedule');
require('./raid_attendance');
var Roster = Bookshelf.Model.extend({
  tableName: 'roster',
  hasTimestamps: true,
  characters: function() {
    return this.belongsToMany('Character');
  },
  schedules: function() {
    return this.belongsToMany('Schedule');
  },
  raid_attendance: function() {
    return this.belongsToMany('Raid_Attendance');
  }
});

module.exports = Bookshelf.model('Roster', Roster);

let Bookshelf = require('./../database').bookshelf;

require('./user');
require('./schedule');
var Raid_Attendance = Bookshelf.Model.extend({
  tableName: 'raid_attendance',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  schedule: function() {
    return this.belongsTo('Schedule');
  }
});

module.exports = Bookshelf.model('Raid_Attendance', Raid_Attendance);

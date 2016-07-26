let Bookshelf = require('./../database').bookshelf;

require('./user');
require('./raid_week');
require('./raid');
var Raid_Attendance = Bookshelf.Model.extend({
  tableName: 'raid_attendance',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  raid_week: function() {
    return this.belongsTo('Raid_Week');
  },
  raid: function() {
    return this.belongsTo('Raid');
  }
});

module.exports = Bookshelf.model('Raid_Attendance', Raid_Attendance);

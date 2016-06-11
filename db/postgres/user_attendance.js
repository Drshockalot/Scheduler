let Bookshelf = require('./../database').bookshelf;

require('./user');
require('./raid_week');
var User_Attendance = Bookshelf.Model.extend({
  tableName: 'User_Attendance',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  raid_week: function() {
    return this.belongsTo('Raid_Week');
  }
});

module.exports = Bookshelf.model('User_Attendance', User_Attendance);

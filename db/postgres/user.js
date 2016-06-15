let Bookshelf = require('./../database').bookshelf;

require('./character');
require('./raid_attendance');
require('./user_availability');
var User = Bookshelf.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  characters: function() {
    return this.hasMany('Character');
  },
  raid_attendance: function() {
    return this.hasMany('Raid_Attendance');
  },
  user_availability: function() {
    return this.hasMany('User_Availability');
  }
});

module.exports = Bookshelf.model('User', User);

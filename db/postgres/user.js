let Bookshelf = require('./../database').bookshelf;

require('./character');
require('./raid_attendance');
var User = Bookshelf.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  characters: function() {
    return this.hasMany('Character');
  },
  attendance: function() {
    return this.hasMany('Raid_Attendance');
  }
});

module.exports = Bookshelf.model('User', User);

let Bookshelf = require('./../database').bookshelf;

require('./schedule');
require('./user_availability');
var Raid_Week = Bookshelf.Model.extend({
  tableName: 'raid_week',
  hasTimestamps: true,
  schedules: function() {
    return this.hasMany('Schedule');
  },
  user_availability: function() {
    return this.hasMany('User_Availability');
  }
});

module.exports = Bookshelf.model('Raid_Week', Raid_Week);

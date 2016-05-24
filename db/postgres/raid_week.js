let Bookshelf = require('./../database').bookshelf;

require('./schedule');
var Raid_Week = Bookshelf.Model.extend({
  tableName: 'raid_week',
  hasTimestamps: true,
  schedules: function() {
    return this.hasMany('Schedule');
  }
});

module.exports = Bookshelf.model('Raid_Week', Raid_Week);

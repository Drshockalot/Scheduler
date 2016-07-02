let Bookshelf = require('./../database').bookshelf;

require('./raid_week');
require('./schedule_boss');
require('./roster');
var Schedule = Bookshelf.Model.extend({
  tableName: 'schedule',
  hasTimestamps: true,
  raid_week: function() {
    return this.belongsTo('Raid_Week');
  },
  schedule_bosses: function() {
    return this.hasMany('Schedule_Boss');
  },
  roster: function() {
    return this.belongsTo('Roster');
  }
});

module.exports = Bookshelf.model('Schedule', Schedule);

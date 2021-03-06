let Bookshelf = require('./../database').bookshelf;

require('./schedule');
require('./boss');
require('./raid');
require('./character');
var Schedule_Boss = Bookshelf.Model.extend({
  tableName: 'schedule_boss',
  schedule: function() {
    return this.belongsTo('Schedule');
  },
  boss: function() {
    return this.belongsTo('Boss');
  },
  raid: function() {
    return this.belongsTo('Raid');
  },
  characters: function() {
    return this.belongsToMany('Character');
  }
});

module.exports = Bookshelf.model('Schedule_Boss', Schedule_Boss);

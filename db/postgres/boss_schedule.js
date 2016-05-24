let Bookshelf = require('./../database').bookshelf;

require('./schedule_boss');
require('./character');
var Boss_Schedule = Bookshelf.Model.extend({
  tableName: 'boss_schedule',
  schedule_boss: function() {
    return this.belongsTo('Schedule_Boss');
  },
  character: function() {
    return this.belongsTo('Character');
  }
});

module.exports = Bookshelf.model('Boss_Schedule', Boss_Schedule);

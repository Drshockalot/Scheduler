let Bookshelf = require('./../database').bookshelf;

require('./roster_list');
require('./user');
require('./boss_schedule');
var Character = Bookshelf.Model.extend({
  tableName: 'character',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  roster_list: function() {
    return this.hasMany('Roster_List');
  },
  boss_schedules: function() {
    return this.hasMany('Boss_Schedule');
  }
});

module.exports = Bookshelf.model('Character', Character);

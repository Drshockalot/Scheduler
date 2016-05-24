let Bookshelf = require('./../database').bookshelf;

require('./roster');
require('./user');
require('./schedule_boss');
var Character = Bookshelf.Model.extend({
  tableName: 'character',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  rosters: function() {
    return this.belongsToMany('Roster');
  },
  schedule_bosses: function() {
    return this.belongsToMany('Schedule_Boss');
  }
});

module.exports = Bookshelf.model('Character', Character);

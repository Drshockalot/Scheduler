let Bookshelf = require('./../database').bookshelf;

require('./character');
require('./schedule');
var Roster = Bookshelf.Model.extend({
  tableName: 'roster',
  hasTimestamps: true,
  characters: function() {
    return this.belongsToMany('Character');
  },
  schedules: function() {
    return this.belongsToMany('Schedule');
  }
});

module.exports = Bookshelf.model('Roster', Roster);

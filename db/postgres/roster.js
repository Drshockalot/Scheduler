let Bookshelf = require('./../database').bookshelf;

require('./character');
var Roster = Bookshelf.Model.extend({
  tableName: 'roster',
  hasTimestamps: true,
  characters: function() {
    return this.belongsToMany('Character');
  }
});

module.exports = Bookshelf.model('Roster', Roster);

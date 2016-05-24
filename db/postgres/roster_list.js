let Bookshelf = require('./../database').bookshelf;

require('./character');
require('./roster');
var Roster_List = Bookshelf.Model.extend({
  tableName: 'roster_list',
  character: function() {
    return this.belongsTo('Character');
  },
  roster: function() {
    return this.belongsTo('Roster');
  }
});

module.exports = Bookshelf.model('Roster_List', Roster_List);

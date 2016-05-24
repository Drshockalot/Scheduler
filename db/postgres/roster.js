let Bookshelf = require('./../database').bookshelf;

require('./roster_list');
var Roster = Bookshelf.Model.extend({
  tableName: 'roster',
  hasTimestamps: true,
  roster_list: function() {
    return this.hasMany('Roster_List');
  }
});

module.exports = Bookshelf.model('Roster', Roster);

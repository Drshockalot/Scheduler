let Bookshelf = require('./../database').bookshelf;

var Roster_List = Bookshelf.Model.extend({
  tableName: 'roster_list'
});

module.exports = Bookshelf.model('Roster_List', Roster_List);

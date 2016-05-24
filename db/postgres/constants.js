let Bookshelf = require('./../database').bookshelf;

var Constants = Bookshelf.Model.extend({
  tableName: 'constants'
});

module.exports = Bookshelf.model('Constants', Constants);

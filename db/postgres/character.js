let Bookshelf = require('./../database').bookshelf;

require('./user');
var Character = Bookshelf.Model.extend({
  tableName: 'character',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = Bookshelf.model('Character', Character);

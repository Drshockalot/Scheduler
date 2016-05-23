let Bookshelf = require('./../database').bookshelf;

require('./character');
var User = Bookshelf.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  characters: function() {
    return this.hasMany('Character');
  }
});

module.exports = Bookshelf.model('User', User);

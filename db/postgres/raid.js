let Bookshelf = require('./../database').bookshelf;

require('./boss');
require('./schedule_boss');
var Raid = Bookshelf.Model.extend({
  tableName: 'raid',
  hasTimestamps: true,
  bosses: function() {
    return this.hasMany('Boss');
  },
  schedule_bosses: function() {
    return this.hasMany('Schedule_Boss');
  }
});

module.exports = Bookshelf.model('Raid', Raid);

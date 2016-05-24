let Bookshelf = require('./../database').bookshelf;

require('./raid');
require('./schedule_boss');
var Boss = Bookshelf.Model.extend({
  tableName: 'boss',
  raid: function() {
    return this.belongsTo('Raid');
  },
  schedule_bosses: function() {
    return this.hasMany('Schedule_Boss');
  }
});

module.exports = Bookshelf.model('Boss', Boss);

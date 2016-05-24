let Bookshelf = require('./../database').bookshelf;

var Boss_Schedule = Bookshelf.Model.extend({
  tableName: 'boss_schedule'
});

module.exports = Bookshelf.model('Boss_Schedule', Boss_Schedule);

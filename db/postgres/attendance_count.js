let Bookshelf = require('./../database').bookshelf;

require('./raid');
require('./roster');
var Attendance_Count = Bookshelf.Model.extend({
  tableName: 'attendance_count',
  raid: function() {
    return this.belongsTo('Raid');
  },
  roster: function() {
    return this.belongsTo('Roster');
  }
});

module.exports = Bookshelf.model('Attendance_Count', Attendance_Count);

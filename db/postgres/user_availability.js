let Bookshelf = require('./../database').bookshelf;

require('./user');
require('./raid_week');
var User_Availability = Bookshelf.Model.extend({
  tableName: 'user_availability',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  },
  raid_week: function() {
    return this.belongsTo('Raid_Week');
  }
});

module.exports = Bookshelf.model('User_Availability', User_Availability);

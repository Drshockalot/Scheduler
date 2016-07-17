
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropColumn('raid_night');
      table.string('week_day');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropColumn('week_day');
      table.date('raid_night');
    })
  ]);
};

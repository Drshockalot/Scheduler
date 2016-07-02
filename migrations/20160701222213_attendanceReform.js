
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropForeign('schedule_id');
      table.dropColumn('schedule_id');
      table.dropForeign('character_id');
      table.dropColumn('character_id');
      table.integer('user_id').references('id').inTable('user');
      table.integer('raid_week_id').references('id').inTable('raid_week');
      table.dropColumn('date_logged');
      table.date('raid_night');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropColumn('raid_night');
      table.date('date_logged');
      table.dropForeign('raid_week_id');
      table.dropColumn('raid_week_id');
      table.dropForeign('user_id');
      table.dropColumn('user_id');
      table.integer('character_id').references('id').inTable('character');
      table.integer('schedule_id').references('id').inTable('schedule');
    })
  ]);
};


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.integer('raid_week_id').references('id').inTable('raid_week').onDelete('CASCADE');
    }),
    knex.schema.table('raid_attendance', function(table) {
      table.dropForeign('schedule_id');
      table.dropForeign('user_id');
      table.foreign('schedule_id').references('id').inTable('schedule');
      table.foreign('user_id').references('id').inTable('user');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.dropForeign('raid_week_id');
      table.dropColumn('raid_week_id');
    }),
    knex.schema.table('attendance', function(table) {
      table.dropForeign('schedule_id');
      table.dropForeign('user_id');
      table.foreign('schedule_id').references('id').inTable('schedule').onDelete('CASCADE');
      table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');
    })
  ]);
};

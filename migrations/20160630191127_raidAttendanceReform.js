
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropColumn('confirmed');
      table.increments('id').primary();
      table.date('date_logged');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.boolean('confirmed');
      table.dropColumn('id');
      table.dropColumn('date_logged');
    })
  ]);
};

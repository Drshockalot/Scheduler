
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid', function(table) {
      table.dropColumn('attendance_count');
    }),
    knex.schema.createTable('attendance_count', function(table) {
      table.increments('id').primary();
      table.integer('raid_id').references('id').inTable('raid');
      table.integer('roster_id').references('id').inTable('roster');
    }),
    knex.schema.table('raid_attendance', function(table) {
      table.integer('roster_id').references('id').inTable('roster');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([]);
};

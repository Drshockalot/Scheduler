
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid', function(table) {
      table.integer('attendance_count').defaultTo(0);
      table.boolean('deleted').defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid', function(table) {
      table.dropColumn('attendance_count');
      table.dropColumn('deleted');
    })
  ]);
};

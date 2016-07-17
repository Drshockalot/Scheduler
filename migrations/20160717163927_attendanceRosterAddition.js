
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.integer('raid_id').references('id').inTable('raid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropForeign('raid_id');
      table.dropColumn('raid_id');
    })
  ]);
};

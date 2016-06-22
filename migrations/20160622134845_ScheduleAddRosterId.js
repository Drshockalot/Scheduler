
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.integer('roster_id').references('id').inTable('roster').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.dropForeign('roster_id');
      table.dropColumn('roster_id');
    })
  ]);
};

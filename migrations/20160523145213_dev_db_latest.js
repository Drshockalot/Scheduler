
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('character', function(table) {
      table.integer('confirmed').defaultTo(0);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('character', function(table) {
      table.dropColumn('confirmed');
    })
  ]);
};

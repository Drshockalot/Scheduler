
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('character', function(table) {
      table.string('realm');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('character', function(table) {
      table.dropColumn('realm');
    })
  ]);
};

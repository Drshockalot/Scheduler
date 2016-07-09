
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('boss', function(table) {
      table.dropColumn('description');
      table.string('public_note');
      table.string('officer_note');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('boss', function(table) {
      table.dropColumn('public_note');
      table.dropColumn('officer_note');
      table.string('description');
    })
  ]);
};

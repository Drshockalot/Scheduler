
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user', function(table) {
      table.unique('battletag');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user', function(table) {
      table.dropUnique('battletag');
    })
  ]);
};


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.dropColumn('published');
    }),
    knex.schema.table('schedule_boss', function(table) {
      table.boolean('published');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.dropColumn('published');
    }),
    knex.schema.table('schedule_boss', function(table) {
      table.boolean('published');
    })
  ]);
};

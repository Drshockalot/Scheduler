
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('boss', function(table) {
      table.integer('tank_count');
      table.integer('healer_count');
      table.integer('dps_count');
    }),
    knex.schema.table('schedule_boss', function(table) {
      table.dropColumn('tank_count');
      table.dropColumn('healer_count');
      table.dropColumn('dps_count');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('boss', function(table) {
      table.dropColumn('tank_count');
      table.dropColumn('healer_count');
      table.dropColumn('dps_count');
    }),
    knex.schema.table('schedule_boss', function(table) {
      table.integer('tank_count');
      table.integer('healer_count');
      table.integer('dps_count');
    })
  ]);
};


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropForeign('user_id');
      table.dropColumn('user_id');
      table.integer('character_id').references('id').inTable('character');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raid_attendance', function(table) {
      table.dropForeign('character_id');
      table.dropColumn('character_id');
      table.integer('user_id').references('id').inTable('user');
    })
  ]);
};

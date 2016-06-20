
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('boss_schedule', 'character_boss_schedule')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('character_boss_schedule', 'boss_schedule')
  ]);
};

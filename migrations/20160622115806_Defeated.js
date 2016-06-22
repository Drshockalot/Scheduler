
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('schedule_boss_character', 'character_schedule_boss')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('character_schedule_boss', 'schedule_boss_character')
  ]);
};

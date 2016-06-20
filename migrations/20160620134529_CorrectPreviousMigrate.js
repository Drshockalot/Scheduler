
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('character_boss_schedule', 'schedule_boss_character')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('schedule_boss_character', 'character_boss_schedule')
  ]);
};

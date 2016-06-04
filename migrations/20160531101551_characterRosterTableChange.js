
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('roster_list', 'character_roster')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('character_roster', 'roster_list')
  ]);
};

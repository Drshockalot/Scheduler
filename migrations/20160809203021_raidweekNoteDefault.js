
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_availability', function(table) {
      table.dropColumn('note');
      table.string('user_note').defaultTo(' ');
    })
  ]);
};

exports.down = function(knex, Promise) {

};

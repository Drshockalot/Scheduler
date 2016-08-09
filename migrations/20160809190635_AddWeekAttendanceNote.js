
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_availability', function(table) {
      table.string('note');
    })
  ]);
};

exports.down = function(knex, Promise) {

};

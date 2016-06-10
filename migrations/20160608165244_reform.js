
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.dropColumn('week_day');
      table.dropColumn('calendar_date');
    }),
    knex.schema.table('raid_week', function(table) {
      table.dropColumn('year_number');
      table.boolean('wednesday');
      table.boolean('thursday');
      table.boolean('friday');
      table.boolean('saturday');
      table.boolean('sunday');
      table.boolean('monday');
      table.boolean('tuesday');
    }),
    knex.schema.createTable('user_availability', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
      table.integer('raid_week_id').references('id').inTable('raid_week').onDelete('CASCADE');
      table.boolean('wednesday');
      table.boolean('thursday');
      table.boolean('friday');
      table.boolean('saturday');
      table.boolean('sunday');
      table.boolean('monday');
      table.boolean('tuesday');
      table.timestamps();
    }),
    knex.schema.table('raid_attendance', function(table) {
      table.dropColumn('player_confirmed');
      table.dropColumn('player_note');
      table.dropColumn('admin_confirmed');
      table.dropColumn('admin_note');
      table.boolean('confirmed');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('schedule', function(table) {
      table.string('week_day');
      table.date('calendar_date');
    }),
    knex.schema.table('raid_week', function(table) {
      table.integer('year_number');
      table.dropColumn('wednesday');
      table.dropColumn('thursday');
      table.dropColumn('friday');
      table.dropColumn('saturday');
      table.dropColumn('sunday');
      table.dropColumn('monday');
      table.dropColumn('tuesday');
    }),
    knex.schema.dropTable('user_availability'),
    knex.schema.table('raid_attendance', function(table) {
      table.string('player_note');
      table.integer('player_confirmed');
      table.string('admin_note');
      table.integer('admin_confirmed');
      table.dropColumn('confirmed');
    })
  ]);
};

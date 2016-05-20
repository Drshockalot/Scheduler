
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function(table) {
      table.increments('id').primary();
      table.string('battletag');
      table.string('role');
      table.timestamps();
    }),
    knex.schema.createTable('character', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('class');
      table.string('rank');
      table.class('main_role');
      table.class('off_role');
      table.string('token');
      table.integer('average_ilvl');
      table.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
      table.timestamps();
    }),
    knex.schema.createTable('roster', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.timestamps();
    }),
    knex.schema.createTable('roster_list', function(table) {
      table.integer('character_id').references('id').inTable('character').onDelete('CASCADE');
      table.integer('roster_id').references('id').inTable('roster').onDelete('CASCADE');
      table.primary(['character_id', 'roster_id']);
    }),
    knex.schema.createTable('raid_week', function(table) {
      table.increments('id').primary();
      table.integer('year_number');
      table.date('start');
      table.date('end');
      table.timestamps();
    }),
    knex.schema.createTable('schedule', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.date('calendar_date');
      table.string('week_day');
      table.timestamps();
    }),
    knex.schema.createTable('raid', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.timestamps();
    }),
    knex.schema.createTable('boss', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('raid_id').references('id').inTable('raid').onDelete('CASCADE');
      table.sring('description');
    }),
    knex.schema.createTable('schedule_boss', function(table) {
      table.increments('id').primary();
      table.integer('schedule_id').references('id').inTable('schedule').onDelete('CASCADE');
      table.integer('boss_id').references('id').inTable('boss').onDelete('CASCADE');
      table.integer('raid_id').references('id').inTable('raid').onDelete('CASCADE');
      table.integer('tank_count');
      table.integer('dps_count');
      table.integer('healer_count');
    }),
    knex.schema.createTable('boss_schedule', function(table) {
      table.increments('id').primary();
      table.integer('schedule_boss_id').references('id').inTable('schedule_boss').onDelete('CASCADE');
      table.integer('character_id').references('id').inTable('character').onDelete('CASCADE');
      table.timestamps();
    }),
    knex.schema.createTable('raid_attendance', function(table) {
      table.integer('schedule_id').references('id').inTable('schedule').onDelete('CASCADE');
      table.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
      table.integer('player_confirmed');
      table.string('player_note');
      table.integer('admin_confirmed');
      table.string('admin_note');
      table.timestamps();
    }),
    knex.schema.createTable('constants', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('value');
    })
  ]);
};

exports.down = function(knex, Promise) {

};

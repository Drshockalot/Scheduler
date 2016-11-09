var config = require('./../knexfile');

var knex = require('knex')(config['amazon']);

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports.bookshelf = bookshelf;
module.exports.knex = knex;

//knex.migrate.latest([config]);

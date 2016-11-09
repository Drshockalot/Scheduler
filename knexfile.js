module.exports = {
  development: {
    client : 'postgresql',
    connection : { host : process.env.HEROKU_POSTGRESQL_BRONZE_HOST,
                   user : process.env.HEROKU_POSTGRESQL_BRONZE_USER,
                   port : 5432,
                  ssl : true,
                   password : process.env.HEROKU_POSTGRESQL_BRONZE_PASSWORD,
                   database : process.env.HEROKU_POSTGRESQL_BRONZE_DATABASE }
  },
  production: {
    client : 'postgresql',
    connection : { host : process.env.HEROKU_POSTGRESQL_MAROON_HOST,
                   user : process.env.HEROKU_POSTGRESQL_MAROON_USER,
                   port : 5432,
                   ssl : true,
                  password : process.env.HEROKU_POSTGRESQL_MAROON_PASSWORD,
                   database : process.env.HEROKU_POSTGRESQL_MAROON_DATABASE }
  },
  amazon: {
    client : 'postgresql',
    connection : { host : process.env.DS_PG_HOST,
                   user : process.env.DS_PG_USER,
                   port : 5432,
                   ssl : false,
                   password : process.env.DS_PG_PASSWORD,
                   database : process.env.DS_PG_DB }
  }
};

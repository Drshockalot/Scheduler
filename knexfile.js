module.exports = {
  development: {
    client : 'postgresql',
    connection : { host : process.env.HEROKU_POSTGRESQL_BRONZE_HOST,
                   user : process.env.HEROKU_POSTGRESQL_BRONZE_USER,
                   port : 5432,
                   ssl : true,
                   password : process.env.HEROKU_POSTGRESQL_BRONZE_PASSWORD,
                   database : process.env.HEROKU_POSTGRESQL_BRONZE_DATABASE }
  }
}

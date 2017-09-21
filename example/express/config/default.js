const path = require('path')
module.exports = {
  server: {
    host: 'localhost',
    port: 3002,
    models: path.resolve(__dirname, '../models')
  },
  database: {
    client: 'mysql',
    connection: {
      host: 'HOST',
      port: 3306,
      user: 'USER',
      password: 'PARSSWORD',
      database: 'DATABASE'
    },
    pool: { min: 1, max: 3 },
    debug: false
  }
}
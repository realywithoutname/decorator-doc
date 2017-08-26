const path = require('path')
module.exports = {
  server: {
    host: 'localhost',
    port: 3001,
    models: path.resolve(__dirname, '../models')
  }
}
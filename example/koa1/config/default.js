const path = require('path')
module.exports = {
  server: {
    host: 'localhost',
    port: 3000,
    models: path.resolve(__dirname, '../models')
  }
}
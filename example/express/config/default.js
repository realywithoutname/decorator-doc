const path = require('path')
module.exports = {
  server: {
    host: 'localhost',
    port: 3002,
    models: path.resolve(__dirname, '../models')
  }
}
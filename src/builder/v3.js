const { isError } = require('../helper')
const BaseBuilder = require('./base')
const path = require('path')
class Builder extends BaseBuilder {
  constructor(conf) {
    super(conf)
    this.server(conf.host, conf.port, conf.basePath)
    this.components = {}
    this.components.schemas = this.schemas
    delete this.schemas
  }
  server(host, port, basePath) {
    let url = 'http://' + path.join(host + ':' + port, basePath).replace(/\\/g, '/')
    this.servers = [{ url, description: this.info.description }]
  }
}

module.exports = Builder
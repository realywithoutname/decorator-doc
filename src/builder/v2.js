const path = require('path')
const { isError } = require('../helper')
const BaseBuilder = require('./base')

let config = {}
class Builder extends BaseBuilder {
  constructor(conf) {
    super(conf)
    this.loadServer(conf)
    this.parseTov2()
    this.swagger = '2.0'
  }

  loadServer({ host, port, basePath }) {
    this.host = host + ':' + port
    this.basePath = path.join('/', basePath).replace(/\\/g, '/')
  }

  parseTov2() {
    this.definitions = this.schemas
    this.parsePaths()
    delete this.schemas
  }
  parsePaths() {
    let paths = this.paths
    Object.keys(paths).forEach((path) => {
      Object.keys(paths[path]).forEach(method => {
        let _method = paths[path][method]
        _method.responses = this.response2v2(_method.responses)
        _method.parameters = this.parameter2v2(_method.parameters)
      })
    })
  }

  response2v2(responses) {
    let response = responses[200]
    response.schema = response.content['application/json'].schema
    delete response.content
    return { 200: response }
  }

  parameter2v2(parameters) {
    return parameters.map(param => {
      let _param = param

      if (param.in !== 'body') {
        _param = Object.assign({}, param.schema, param)
        delete _param.schema
      }

      return _param
    })
  }
}

module.exports = Builder
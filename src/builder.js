const config = require('config')
const { metaV2 } = require('./meta')
const { isError, merge } = require('./helper')
const path = require('path')
const v3Builder = require('./builder-v3')
let server = config.get('server')
let pkgconf = {}

class Builder {
  constructor() {
    if (Builder._instance) {
      return Builder._instance
    }
    this.schemas = []
    Builder._instance = this
  }

  loadServer({ host, port, basePath = '' }) {
    isError(!host, 'Can\'t find host from config')

    isError(!port, 'Can\'t find port from config')

    basePath = basePath || 'v' + pkgconf.version
    metaV2.host = host + ':' + port
    metaV2.basePath = path.join('/', basePath).replace(/\\/g, '/')
  }

  parsePaths(paths) {
    Object.keys(paths).forEach((path) => {
      Object.keys(paths[path]).forEach(method => {
        let _method = paths[path][method]
        let responses = _method.responses[200]
        responses.schema = responses.content['application/json'].schema
        delete responses.content
        _method.parameters = _method.parameters.map(param => {
          let _param = param

          if (param.in !== 'body') {
            _param = Object.assign({}, param.schema, param)
            delete _param.schema
          }

          return _param
        })
      })
    })
  }

  doc(config = {}) {
    let v3 = new v3Builder(this.schemas)
    let { info, tags, paths, components } = v3.doc(config)
    const packagePath = path.join(process.cwd(), 'package.json')
    pkgconf = require(config.package || packagePath)
    metaV2.definitions = components.schemas
    config = Object.assign(server, config)
    this.loadServer(config)
    this.parsePaths(paths)
    Object.assign(metaV2, { info, tags, paths })
    require('swagger-parser').validate(metaV2).catch(err => console.log(err))
    return metaV2
  }
}

module.exports = new Builder()
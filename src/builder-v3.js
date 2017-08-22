const config = require('config')
const url = require('url')
const path = require('path')
const _ = require('lodash')
const packagePath = path.join(process.cwd(), 'package.json')
const { meta, info } = require('./meta')
const { isError, merge } = require('./helper')

let server = config.get('server')
let pkgconf = {}

class Builder {
  constructor(schemas) {
    this.schemas = schemas
  }

  loadServer({ host, port, basePath = '' }) {
    isError(!host, 'Can\'t find host from config')

    isError(!port, 'Can\'t find port from config')

    basePath = basePath || 'v' + pkgconf.version
    let url = 'http://' + path.join(host + ':' + port, basePath).replace(/\\/g, '/')
    meta.servers.push({ url, description: pkgconf.description })
  }

  loadInfo() {
    info.title = pkgconf.name
    info.description = pkgconf.description
    info.contact = typeof pkgconf.author === typeof ''
      ? { name: pkgconf.author } : pkgconf.author
    info.license = typeof pkgconf.license === typeof ''
      ? { name: pkgconf.license } : pkgconf.license
    info.version = pkgconf.version
    meta.info = info
  }

  loadTags() {
    let tags = {}
    meta.tags = []
    for (let i = 0; i < this.schemas.length; i++) {
      let { name, description } = this.schemas[i]

      if (tags[name]) continue
      tags[name] = true

      isError(!name, 'Have a model without name.')

      meta.tags.push({ name, description })
    }
  }

  loadApiProps(modelName, apiName, refs = {}) {
    let regionProps = meta.components.schemas[modelName].properties
    let refProps = {}

    isError(!_.isPlainObject(refs), 'Joined model must be a object.')

    for (let key in refs) {
      if (refs.hasOwnProperty(key)) {
        let emt = refs[key]

        isError(regionProps[key], 'The key ' + key + 'has defined in region model.')

        if (emt.constructor.name === 'Schema') {
          refProps[key] = emt
          continue
        }

        isError((!emt.key && emt.model) || (!emt.model && emt.key), 'Joined model must define name and key.')
        isError(!meta.components.schemas[emt.model], 'Can\'t find model named ' + emt.model)

        let prop = _.get(meta.components.schemas, `${emt.model}.properties.${emt.key}`)

        isError(!prop, 'Can\'t find key named ' + emt.key + ' in model ' + emt.model)

        refProps[key] = prop
      }
    }

    return Object.assign({}, refProps, regionProps)
  }
  /**
   * 从定义的参数列表获取实际属性集合
   * @param {Array} query 如果该参数为undefined则接受所有已定义的参数，如果是数组则接受数组中定义的参数。
   * @param {Array} body 如果该参数为undefined则接受所有已定义的参数，如果是数组则接受数组中定义的参数。
   * @param {Array} params 该参数为URL中的parameter列表，由解析URL获取。
   * @param {Array} require 该参数为必填的参数列表。
   * @param {Object} props api所有的可选属性
   */
  parseParameters(query, body, params, required = [], props, apiName) {
    function setParameter(_in, _required) {
      return (name) => {
        isError(!_.isString(name) || !name, 'Parameter item name must be string and can\'t be empty.')

        let schema = props[name]

        isError(!schema, 'Can\'t find parameter ' + name + ' parameter in ' + apiName + '\'s properties.')

        let parameter = { name, in: _in, required: _required ? _required : required.indexOf(name) !== -1, schema }

        return parameter
      }
    }
    let queryParameters = query.map(setParameter('query'))
    let paramParameters = params.map(setParameter('path', true))
    let bodyParameters = body.map(setParameter('body'))

    return queryParameters.concat(paramParameters).concat(bodyParameters)
  }

  parseResponse(response, props) {
    return {
      type: 'object',
      properties: response.reduce((res, name) => {
        isError(!_.isString(name) || !name, 'Responce item name must be string and can\'t be empty.')
        return _.set(res, name, props[name])
      }, {})
    }
  }

  parseModelPath({ name, description: _description, apis }) {
    let paths = meta.paths
    for (let key in apis) {
      if (apis.hasOwnProperty(key)) {
        let { query, refs, response = {}, path, method, body, required, description = '' } = apis[key]
        let apiName = name + ' ' + key
        let regionProps = meta.components.schemas[name].properties
        let props = this.loadApiProps(name, key, refs)
        isError(!path, 'The path parameter can\'t be empty in model' + apiName + ' api.')
        isError(!method, 'The method parameter can\'t be empty in model' + apiName + ' api.')

        let parameters = Object.keys(props)
        let params = (path.match(/\{\s*(\w+)?\s*\}/g) || []).map(item => item.match(/\{\s*(\w+)?\s*\}/)[1])

        let _path = paths[path] = paths[path] || {}

        method = method.toLocaleLowerCase()

        if (method === 'post' || method === 'put') {
          query = query || []
        } else {
          body = body || []
        }
        _path[method] = {
          tags: [name],
          description,
          operationId: key,
          parameters: this.parseParameters(query || parameters, body || parameters, params, required, props, apiName),
          responses: {
            200: {
              description: _description,
              content: {
                'application/json': {
                  schema: {
                    type: response.type || 'object',
                    items: this.parseResponse(response.props || Object.keys(regionProps), props)
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  loadPaths() {
    let schemas = this.schemas
    for (let i = 0; i < schemas.length; i++) {
      let { name, description, properties } = schemas[i]
      let required = []
      Object.keys(properties).forEach(key => {
        properties[key].required && required.push(key)
        delete properties[key].required
      })

      meta.components.schemas[name] = { type: 'object', required, description, properties }
    }

    schemas.forEach(this.parseModelPath.bind(this))
  }

  doc(config = {}) {
    pkgconf = require(config.package || packagePath)

    isError(
      !pkgconf || !pkgconf.name,
      pkgconf.name
        ? 'The application must have a name, can\'t get name from package.json.'
        : 'The application must hava a package.json file.'
    )

    config = Object.assign(server, config)

    this.loadServer(config)

    this.loadInfo()

    this.loadTags()

    this.loadPaths()
    return meta
  }
}

module.exports = Builder
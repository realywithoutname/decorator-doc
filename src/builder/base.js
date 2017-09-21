const { isError } = require('../helper')
const convert = require('joi-to-json-schema')
const _ = require('lodash')
const Joi = require('joi')
let config = null

class Builder {
  constructor(conf) {
    config = conf
    this.info(conf.pkgconf)
    this.schemas(conf.models)
    this.paths = {}
    conf.models.forEach(this.parseModel2Path.bind(this))
  }

  info(pkgconf) {
    let info = {}

    info.title = pkgconf.name
    info.version = pkgconf.version
    info.description = pkgconf.description

    if (pkgconf.author)
      info.contact = typeof pkgconf.author === typeof '' ? { name: pkgconf.author } : pkgconf.author

    if (pkgconf.license)
      info.license = typeof pkgconf.license === typeof '' ? { name: pkgconf.license } : pkgconf.license

    this.info = info
  }

  parseProperties(properties) {
    let required = []

    Object.keys(properties).forEach(key => {
      let prop = properties[key]
      prop.required && required.push(key)
      let schema = convert(Object.assign({}, prop))
      schema['x-schema'] = prop.optional()
      properties[key] = schema
      Object.defineProperty(schema, 'x-schema', {value: prop.optional(), enumerable: false})
      delete prop.required
    })

    return required.length ? { required, properties } : { properties }
  }

  schemas(models) {
    let schemas = this.schemas = {}
    let tags = this.tags = []

    for (let { name, description, properties } of models) {
      schemas[name] = Object.assign({ type: 'object', description }, this.parseProperties(properties))
      tags.push({ name, description })
    }
  }
  /**
   *
   * @param {object} apis 配置信息
   * api.description
   * api.refs 额外schema集合
   * api.path
   * api.query 可接受参数集合，必须所有都是字符串
   * api.body 可接受数据集合，可以是字符串和对象，如果是对象必须是{type: 'array | object', description: '', name: '', props: []}。
   * api.method
   * api.required 必须的参数集合
   * api.response {type: 'array | object', props: []},props数组中可接受字符串和对象，如果是对象必须是{type: 'array | object', description: '', name: '', props: []}
   */
  parseModel2Path({ name, description: _description, apis }) {
    for (let key in apis) {
      if (apis.hasOwnProperty(key)) {
        let {
          description,
          refs,
          path,
          query,
          body,
          method,
          required = [],
          deprecated,
          response = {}
        } = apis[key]
        let apiName = name + ' ' + key

        isError(!path, 'The path parameter can\'t be empty in model' + apiName + ' api.')
        isError(!method, 'The method parameter can\'t be empty in model' + apiName + ' api.')

        method = method.toLocaleLowerCase()

        let regionProps = this.schemas[name].properties
        let _path = this.paths[path] = this.paths[path] || {}
        let api = _path[method] = {}
        let props = refs ? this.externalProps(name, refs, apiName) : regionProps
        let params = (path.match(/\{\s*(\w+)?\s*\}/g) || []).map(item => item.match(/\{\s*(\w+)?\s*\}/)[1])
        /**
         * 根据method处理query，body没有值得情况
         * query 为空
         *    post或put 空
         *    其他 API所有属性
         * body 为空
         *    post或put API所在Model所有属性
         *    其他 空
         * response 为空
         *    返回API所在Model所有属性
         */
        if (method === 'post' || method === 'put') {
          query = query || []
          body = body || { type: 'object', props: Object.keys(regionProps) }
        } else {
          body = body || null
          query = query || Object.keys(props)
        }

        response.type = response.type || 'object'
        response.description = response.description || _description
        response.props = response.props || Object.keys(regionProps)

        api.tags = [name]
        api.operationId = key
        api.description = description
        api.parameters = this.parseParameters(query, body, params, required, props, apiName)
        api.responses = this.parseResponse(response, props, apiName)
        api.deprecated = deprecated
      }
    }
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

        isError(!schema, 'Can\'t find ' + name + ' parameter in ' + apiName + '\'s properties.')

        let parameter = {
          name,
          schema,
          in: _in,
          description: schema.description,
          required: _required ? _required : required.indexOf(name) !== -1
        }
        Object.defineProperty(parameter, 'x-schema', { value: schema['x-schema'], enumerable: false })
        return parameter
      }
    }
    let queryParameters = query.map(setParameter('query'))
    let paramParameters = params.map(setParameter('path', true))

    function parseBody () {
      function parseObject(item, index = 0, xSchema) {
        isError(!_.isPlainObject(item), apiName + ' body properties must be string or object.')

        isError(!item.props || !_.isArray(item.props), apiName + ' body item ' + index + 'must have props property, must be array.')
        let itemSchema = Joi.object().keys()

        item.props.forEach((item, index) => {
          if (_.isString(item)) return itemSchema = itemSchema.keys({ [item]: props[item]['x-schema'] })
          itemSchema = parseObject(item, index, itemSchema)
        })

        if (item.type === 'array') {
          xSchema = xSchema ? xSchema.keys({[item.name]: Joi.array().items(itemSchema)}) : Joi.array().items(itemSchema)
        } else {
          xSchema = xSchema ? xSchema.keys({[item.name]: itemSchema}) : itemSchema
        }

        return xSchema
      }

      let xSchema = parseObject(body)
      let parameter = {
        in: 'body',
        name: 'body',
        schema: convert(xSchema)
      }
      Object.defineProperty(parameter, 'x-schema', { value: xSchema, enumerable: false })
      return parameter
    }
    let bodyParameters = body ? [
      parseBody()
    ] : []


    return queryParameters.concat(paramParameters).concat(bodyParameters)
  }
  // 暂时只支持一个状态码200的响应
  parseResponse(response, props, apiName) {
    let schema = { type: response.type, description: response.description }
    let _response = {
      description: response.description,
      content: {
        'application/json': {
          schema
        }
      }
    }
    let properties = {}
    if (response.type === 'array') {
      schema.items = { type: 'object', properties }
    } else {
      schema.properties = properties
    }

    response.props.forEach((item, index) => {
      if (_.isString(item)) {
        let schema = props[item]
        isError(!schema, 'Can\'t find ' + item + ' parameter in ' + apiName + '\'s properties.')
        properties[item] = schema
        return
      }
      isError(!_.isPlainObject(item), apiName + ' response properties must be string or object.')

      isError(!item.props || !_.isArray(item.props), apiName + ' response item ' + index + 'must have props property, must be array.')

      let items = { type: 'object' }
      properties[item.name] = {
        items,
        description: item.description,
        type: item.type
      }


      items.properties = item.props.reduce((res, key) => {
        let schema = props[key]
        isError(!schema, 'Can\'t find ' + item + ' parameter in ' + apiName + '\'s properties.')
        res[key] = schema
        return res
      }, {})

      if (item.type !== 'array') {
        properties[item.name].properties = items.properties
        delete properties[item.name].items
      }
    })

    return { 200: _response }
  }

  externalProps(name, refs, apiName) {
    let regionProps = this.schemas[name].properties
    let refProps = {}

    isError(!_.isPlainObject(refs), 'Joined model must be a object.')

    for (let key in refs) {
      if (refs.hasOwnProperty(key)) {
        let emt = refs[key]

        isError(regionProps[key], 'The key ' + key + 'has defined in region model.')

        if (emt.isJoi) {
          refProps[key] = this.parseProperties({ [key]: emt }).properties[key]
          continue
        }

        isError((!emt.key && emt.model) || (!emt.model && emt.key), 'Joined model must define name and key.')
        isError(!this.schemas[emt.model], 'Can\'t find model named ' + emt.model)

        let prop = _.get(this.schemas, `${emt.model}.properties.${emt.key}`)

        isError(!prop, 'Can\'t find key named ' + emt.key + ' in model ' + emt.model)

        refProps[key] = prop
      }
    }

    return Object.assign({}, refProps, regionProps)
  }
}

module.exports = Builder
let meta = require('./base')

module.exports.meta = {
  openapi: '3.0',
  tags: [],
  info: {},
  paths: {},
  servers: [],
  components: {
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemes: {},
    links: {},
    callbacks: {}
  },
  security: {},
  externalDocs: {}
}

module.exports.path = {
  trace: {},
  servers: []
}
module.exports.parameter = {
  deprecated: false,
  allowEmptyValue: false,
  style: '',
  explode: false,
  allowReserved: false,
  schema: {},
  example: '',
  examples: {},
  content: {}
}

module.exports.response = {
  description: '',
  headers: {},
  content: {
    '': {
      schema: {},
      example: '',
      examples: {},
      encoding: {}
    }
  },
  links: {}
}

module.exports.schema = {
  oneOf: {},
  anyOf: {},
  not: {},
  nullable: false,
  deprecated: false
}

Object.keys(meta).forEach(key => {
  let _meta = Object.assign({}, mata[key], module.exports[key])
  _meta.check = check.bind(_meta)
  module.exports[key] = _meta
})

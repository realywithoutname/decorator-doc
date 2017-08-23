let meta = require('./base')

module.exports.format = {
  integer: 'integer',
  long: 'integer',
  float: 'number',
  double: 'number',
  number: 'number', // 对于js而言，可能时常用到
  string: 'string',
  byte: 'string',
  binary: 'string',
  boolean: 'boolean',
  date: 'string',
  dateTime: 'string',
  password: 'string'
}

module.exports.doc = {
  swagger: '2.0',
  info: {},
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https', 'ws', 'wss'],
  consumes: [],
  produces: [],
  paths: {},
  definitions: {},
  parameters: {},
  responses: {},
  securityDefinitions: {},
  security: [],
  tags: [],
  externalDocs: {}
}

module.exports.parameter = {
  type: '',
  format: '',
  allowEmptyValue: false,
  items: {},
  collectionFormat: '',
  default: '',
  maximum: 0,
  exclusiveMaximum: false,
  minimum: 0,
  exclusiveMinimum: false,
  maxLength: 0,
  minLength: 0,
  pattern: '',
  maxItems: 0,
  minItems: 0,
  uniqueItems: true,
  enum: [],
  multipleOf: 0,
  schema: {} // 只有in为body的时候能用
}

module.exports.response = {
  description: '',
  schema: {},
  headers: {},
  examples: {}
}


module.exports.item = module.exports.header = module.exports.parameter


function check() {

}

Object.keys(meta).forEach(key => {
  let _meta = Object.assign({}, mata[key], module.exports[key])
  _meta.check = check.bind(_meta)
  module.exports[key] = _meta
})

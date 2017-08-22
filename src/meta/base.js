module.exports.format = {
  integer: 'integer',
  long: 'integer',
  float: 'number',
  double: 'number',
  number: 'number',
  string: 'string',
  byte: 'string',
  binary: 'string',
  boolean: 'boolean',
  date: 'string',
  dateTime: 'string',
  password: 'string'
}

module.exports.info = {
  title: '',
  description: '',
  termsOfService: '',
  contact: {
    name: '',
    url: '',
    email: ''
  },
  license: {
    name: '',
    url: ''
  },
  version: ''
}

module.exports.path = {
  $ref: '',
  get: {},
  put: {},
  post: {},
  delete: {},
  options: {},
  head: {},
  patch: {},
  paramters: []
}

module.exports.operation = {
  tags: [],
  summary: '',
  description: '',
  externalDocs: {},
  operationId: '',
  paramters: [],
  responses: {},
  deprecated: false,
  security: []
}

module.exports.externalDoc = {
  description: '',
  url: ''
}

module.exports.paramter = {
  name: '',
  in: ['query', 'header', 'path', 'cookie'],
  description: '',
  required: false
}

module.exports.tag = {
  name: '',
  description: '',
  externalDocs: {}
}

module.exports.reference = {
  $ref: ''
}

module.exports.schema = {
  title: '',
  multipleOf: '',
  maximum: 0,
  exclusiveMaximum: 0,
  minimum: 0,
  exclusiveMinimum: 0,
  maxLength: 0,
  minLength: 0,
  pattern: '',
  maxItems: 0,
  minItems: 0,
  uniqueItems: 0,
  maxProperties: 0,
  minProperties: 0,
  required: false,
  enum: [],
  type: '',
  allOf: {},
  items: {},
  properties: {},
  additionalProperties: {},
  description: '',
  format: '',
  default: '',
  discriminator: {},
  readOnly: false,
  writeOnly: false,
  xml: {},
  externalDocs: {},
  example: {}
}

module.exports.schemas = []
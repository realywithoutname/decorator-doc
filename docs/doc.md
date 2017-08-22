DOC
  Model
    Schema

format = {
  integer: integer,
  long: integer,
  float: number,
  double: number,
  string: string,
  byte: string,
  binary: string,
  boolean: boolean,
  date: string,
  dateTime: string,
  password: string
}

DOC = {
  openapi: required & String,
  info: required &Object,
  servers: Array,
  paths: required & Object,
  components: Object,
  security: Array,
  tags: Array,
  externalDocs: Object
}

info = {
  title: required & String,
  description: String,
  termsOfService: String,
  contact: {
    name: String,
    url: String,
    email: String
  },
  license: {
    name: required & String,
    url: String
  },
  version: required & String
}

server = {
  url: required & String,
  description: String,
  variables: Object(String)
}

components = {
  schemas: Object(string, Schema),
  responses: Object(string, Response),
  parameters: Object(string, Parameter),
  examples: Object(string, Example),
  requestBodies: Object(string, Body),
  headers: Object(string, Header),
  securitySchemes: Object(string, Security),
  links: Object(string, Link),
  callbacks: Object(string, Callback)
}

paths = {
  path: {
    $ref: String,
    summary: String,
    description: String,
    get: Object(Operation),
    put: Object(Operation),
    post: Object(Operation),
    delete: Object(Operation),
    options: Object(Operation),
    head: Object(Operation),
    patch: Object(Operation),
    trace: Object(Operation),
    servers: Array,
    paramters: [Object(Parameter)]
  }
}

Operation = {
  tags: Array,
  summary: String,
  description: String,
  externalDocs: Object(ExternalDoc),
  operationId: String,
  paramters: [Object(Parameter)],
  requestBody: Object(RequestBody), // 不用
  responses: required & Object(String, Response),
  callbacks: Object(string, Callback),
  deprecated: Boolean, // 定义接口状态 true 为弃用
  security: Array,
  servers: Array
}

ExternalDoc = {
  description: String,
  url: String
}

Parameter = {
  name: String,
  in: query | header | path | cookie,
  description: String,
  required: Boolean,
  deprecated: Boolean,
  allowEmptyValue: Boolean,
  style: String,
  explode: Boolean,
  allowReserved: Boolean,
  schema: Object(Schema),
  example: Any,
  examples: Object(String, Example),
  content: Object(String, MediaType)
}

RequestBody = {
  description: String,
  content: Object(MediaType),
  required: Boolean
}

MediaType = {
  schema: Object(Schema),
  example: Any,
  examples: Object(String, Example),
  encoding: Object(string, Encodeing)
}
Responses = {
  default: Object(Reponse),
  statusCode: Object(Reponse)
}
Response = {
  description: required | String,
  headers: Object(String, Header),
  content: Object(string, MediaType),
  links: Object(string, Link)
}
Callback = {
  Expression: Object(Path)
}
Example = {
  summary: String,
  description: String,
  value: any,
  externalValue: String
}
Link = {

}
Header ={
  name: String,
  in: String
}
Tag = {}

Reference = {
  $ref: required | String
}
Schema = {
  title: String,
  multipleOf: String,
  maximum: Number,
  exclusiveMaximum: Number,
  minimum: Number,
  exclusiveMinimum: Number,
  maxLength: Number,
  minLength: Number,
  pattern: Pattern,
  maxItems: Number,
  minItems: Number,
  uniqueItems: Number,
  maxProperties: Number,
  minProperties: Number,
  required: Boolean,
  enum: Array,
  type: String,
  allOf: Schema,
  oneOf: Schema,
  anyOf: Schema,
  not: Schema,
  items: Object(Schema),
  properties: Schema,
  additionalProperties: Schema,
  description: String,
  format: String,
  default: any,
  nullable: Boolean,
  discriminator: Object(Discriminator),
  readOnly: Boolean,
  writeOnly: Boolean,
  xml: Xml,
  externalDocs: ExternalDocs,
  example: any,
  deprecated: Boolean
}
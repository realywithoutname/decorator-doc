const joi = require('joi')
const { format } = require('./meta')
class Schema {
  constructor(description) {
    this.description = description
    this.type = 'string'
  }
  title(title) {
    this.title = title
    return this
  }
  multipleOf(multipleOf) {
    this.multipleOf = multipleOf
    return this
  }
  maximum(maximum) {
    this.maximum = maximum
    return this
  }
  exclusiveMaximum(exclusiveMaximum) {
    this.exclusiveMaximum = exclusiveMaximum
    return this
  }
  minimum(minimum) {
    this.minimum = minimum
    return this
  }
  exclusiveMinimum(exclusiveMinimum) {
    this.exclusiveMinimum = exclusiveMinimum
    return this
  }
  maxLength(maxLength) {
    this.maxLength = maxLength
    return this
  }
  minLength(minLength) {
    this.minLength = minLength
    return this
  }
  pattern(pattern) {
    this.pattern = pattern
    return this
  }
  maxItems(maxItems) {
    this.maxItems = maxItems
    return this
  }
  minItems(minItems) {
    this.minItems = minItems
    return this
  }
  uniqueItems(uniqueItems) {
    this.uniqueItems = uniqueItems
    return this
  }
  maxProperties(maxProperties) {
    this.maxProperties = maxProperties
    return this
  }
  minProperties(minProperties) {
    this.minProperties = minProperties
    return this
  }
  required(required = true) {
    this.required = required
    return this
  }
  enum($enum) {
    this.enum = $enum
    return this
  }
  integer() {
    this.format = 'integer'
    this.type = format['integer']
    return this
  }
  long() {
    this.format = 'long'
    this.type = format['long']
    return this
  }
  float() {
    this.format = 'float'
    this.type = format['float']
    return this
  }
  double() {
    this.format = 'double'
    this.type = format['double']
    return this
  }
  string() {
    this.format = 'string'
    this.type = format['string']
    return this
  }
  byte() {
    this.format = 'byte'
    this.type = format['byte']
    return this
  }
  binary() {
    this.format = 'binary'
    this.type = format['binary']
    return this
  }
  boolean() {
    this.format = 'boolean'
    this.type = format['boolean']
    return this
  }
  date() {
    this.format = 'date'
    this.type = format['date']
    return this
  }
  dateTime() {
    this.format = 'dateTime'
    this.type = format['dateTime']
    return this
  }
  password() {
    this.format = 'password'
    this.type = format['password']
    return this
  }
  allOf(allOf) {
    this.allOf = allOf
    return this
  }
  oneOf(oneOf) {
    this.oneOf = oneOf
    return this
  }
  anyOf(anyOf) {
    this.anyOf = anyOf
    return this
  }
  not(not) {
    this.not = not
    return this
  }
  items(items) {
    this.items = items
    return this
  }
  properties(properties) {
    this.properties = properties
    return this
  }
  additionalProperties(additionalProperties) {
    this.additionalProperties = additionalProperties
    return this
  }
  description(description) {
    this.description = description
    return this
  }
  format(format) {
    this.format = format
    return this
  }
  default($default) {
    this.default = $default
    return this
  }
  nullable(nullable = true) {
    this.nullable = nullable
    return this
  }
  discriminator(discriminator) {
    this.discriminator = discriminator
    return this
  }
  readOnly(readOnly = true) {
    this.readOnly = readOnly
    return this
  }
  writeOnly(writeOnly = true) {
    this.writeOnly = writeOnly
    return this
  }
  xml(xml) {
    this.xml = xml
    return this
  }
  externalDocs(externalDocs) {
    this.externalDocs = externalDocs
    return this
  }
  example(example) {
    this.example = example
    return this
  }
  deprecated(deprecated = true) {
    this.deprecated = deprecated
    return this
  }
}

module.exports = (description) => {
  return new Schema(description)
}
const schemas = require('./meta/schemas')
const _ = require('lodash')
const { isError, merge } = require('./helper')

let model = function (description, name) {
  return (target) => {
    let schema = target.swagger$$schema
    schema.name = _.capitalize(name || target.name)
    schema.description = description

    isError(!schema.name, 'A model without name.')

    schemas.push(schema)
    Object.defineProperty(target, 'schema', {
      enumerable: false,
      value: schema
    })
  }
}

model.props = function (props) {
  return (target) => {
    merge(target, 'swagger$$schema.properties', props)
  }
}

model.isAdditional = function (bool = true) {
  return (target) => {
    merge(target, 'swagger$$schema.additional', bool)
  }
}
module.exports = model
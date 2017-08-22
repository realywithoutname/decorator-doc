const builder = require('./builder')
const { isError, merge } = require('./helper')

let model = function (description) {
  return (target) => {
    let schema = target.schema
    schema.name = target.name
    schema.description = description

    isError(!schema.name, 'A model without name.')

    builder.schemas.push(schema)
  }
}

model.props = function (props) {
  return (target) => {
    merge(target, 'schema.properties', props)
  }
}

module.exports = model
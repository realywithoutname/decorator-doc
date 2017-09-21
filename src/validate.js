const { isError, isKoa } = require('./helper')
const co = require('co')
const Joi = require('joi')
module.exports = function (schema, controller) {
  let action = controller[schema.operationId]
  let parameters = schema.parameters

  return function () {
    let _isKoa = isKoa(this, arguments)
    let ctx = this === global ? arguments[0] : this
    let next = arguments[arguments.length - 1]
    let {request: req, res} = ctx

    if (!_isKoa) {
      req = arguments[0]
      res = arguments[1]
    }
    let query = req.query
    let path = req.params || ctx.params
    let body = req.body
    let data = { query, path, body }
    for (let i = 0; i < parameters.length; i++) {
      let { 'x-schema': schema, 'in': _in, name, required} = parameters[i]
      let value = _in === 'body' ? data[_in] : data[_in][name]
      schema = required ? schema.required() : schema
      let result = Joi.validate(value, schema)
      isError(result.error, `Field [${name}] ${result.error}.`)
    }

    return co.wrap(action)
      .apply(controller, _isKoa ? [ctx] : arguments)
      .catch((err) => console.log(err))
  }
}
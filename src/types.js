const schema = require('./schema')
const { format } = require('./meta/base')
const _ = require('lodash')
const types = Object.keys(format)

module.exports = types.reduce((res, type) => _.set(res, type, () => schema().setType(type)), {})
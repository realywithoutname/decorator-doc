const _ = require('lodash')
function isPrimitive(val) {
  return val === undefined || val === null || ['string', 'number', 'boolean'].indexOf(typeof val) !== -1
}

function _merge(source, val) {
  if (typeof source !== typeof val) {
    throw new Error('Can\'t merge diffrent type object')
  }

  if (_.isArray(source)) {
    source = mergeArray(source, val)
  }

  if (_.isPlainObject(source)) {
    source = mergeObject(source, val)
  }

  return source
}

function mergeArray(source, val) {
  val.forEach((item) => {
    if (isPrimitive(item)) {
      return source.indexOf(item) === -1 ? source.push(item) : source
    }
    source.push(item)
  })
  return source
}

function mergeObject(source, val) {
  Object.keys(val).forEach(key => {
    let old = source[key]

    if (!old || isPrimitive(old)) {
      return source[key] = val[key]
    }

    source[key] = _merge(old, val[key])
  })

  return source
}
module.exports.merge = function (source, target, val) {

  module.exports.isError(!source, 'The first paramter must be a javascript object')

  let old = _.get(source, target)
  if (!old || isPrimitive(old)) {
    return _.set(source, target, val)
  }
  _.set(source, target, _merge(old, val))

  return _.get(source, target)
}

module.exports.isError = function (express, message) {
  if (express) throw new Error(message)
}
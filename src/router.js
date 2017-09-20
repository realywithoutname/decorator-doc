const { merge, isError } = require('./helper')
const _ = require('lodash')

const methods = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace'
]

function router(arg) {
  isError(!_.isString(arg) && !_.isPlainObject(arg), 'First argument must be string or object')

  arg = _.isString(arg) ? { description: arg } : arg
  return setValue(arg)
}

function setValue(arg, cb) {
  isError(!_.isPlainObject(arg), 'First argument must be object')

  return (target, key, descritor) => {
    merge(target.constructor, `swagger$$schema.apis.${key}`, arg)
    cb && cb(target, key, descritor)
  }
}

function operation(method) {
  return (path) => {
    return setValue({ path, method })
  }
}

methods.forEach(method => router[method] = operation(method))

router.query = function (props = []) {
  return setValue({ query: props })
}

router.join = function (refModelName, props) {
  if (_.isPlainObject(refModelName)) {
    return setValue({ refs: refModelName })
  }

  if (_.isString(refModelName)) {
    let _props = {}
    _.capitalize(refModelName)
    for (let prop of props) {
      let test = prop.match(/(\w+)\s+as\s+(\w+)/)
      if (test) {
        _props[test[2]] = { key: test[1], model: refModelName }
      } else {
        _props[prop] = { key: prop, model: refModelName }
      }
    }
    return setValue({ refs: _props })
  }
}

router.body = function (props = []) {
  return setValue({ body: { type: 'object', props } })
}

router.body.array = function (props = []) {
  return setValue({ body: { type: 'array', props } })
}

router.required = function (props) {
  return setValue({ required: props })
}

router.deprecated = function (deprecated = true) {
  return setValue({ deprecated })
}
router.response = function (props) {
  return setValue({ response: { type: 'object', props } })
}

router.response.array = function (props) {
  return setValue({ response: { type: 'array', props } })
}

module.exports = router
const config = require('config')
const fs = require('fs')
const path = require('path')
const requrieDir = require('require-dir')
const _ = require('lodash')

const schemas = require('./meta/schemas')
const { isError, isWarning } = require('./helper')

const routes = {}
/**
 * 生成中间件
 * @param {Object} controllers controller集合
 */
function generateHandles(apis = {}, controller, fileName) {
  // 如果controller文件export一个function或者class，则先实例化该controller
  if (_.isFunction(controller)) {
    controller = new controller
  }
  Object.keys(apis).forEach(target => {
    let { method, path } = apis[target]

    isError((controller[target] && !_.isFunction(controller[target]) || !controller[target]), 'Can not find action ' + target + ' at ' + fileName)

    let paths = routes[path] = routes[path] || []
    paths.push({ method, controller, target: target })
  })
}

/**
 * 检查并完善config
 * 合并用户参数与通过config组件获取的配置信息，用户参数拥有更高优先级
 * 期望获得host，port，basePath，pkgconf, controllers， models。如果用户没有传入期望的参数，
 * 则通过config组件从项目目录下的获取配置文件server属性的配置信息
 */
module.exports = function (conf) {
  conf = Object.assign({}, { host: '127.0.0.1', port: 3000 }, config.get('server') || {}, conf)

  if (_.isString(conf.pkgconf)) {
    try {
      let pkg = require(conf.pkgconf)
      conf.pkgconf = pkg
    } catch (e) {
      isWarning(true, e.message)
    }
  }

  if (!conf.pkgconf) {
    let packagePath = path.join(conf.root, 'package.json')
    try {
      let pkg = require(packagePath)
      conf.pkgconf = pkg
    } catch (e) {
      isError(true, 'Try get package.json infomation from ' + packagePath + ' but failed. \nPlease set pkgconf property with package.json path to config')
    }
  }

  isError(!conf.pkgconf.name, 'The name property is required in package.json.')
  isError(!conf.pkgconf.version, 'The version property is required in package.json.')
  isWarning(!conf.host, 'Can\'t get property host from config, default 127.0.0.1')
  isWarning(!conf.port, 'Can\'t get property port from config, default 3000')
  isWarning(!conf.basePath, 'Can\'t get property basePath from config, default /v' + conf.pkgconf.version)

  conf.basePath = conf.basePath || '/v' + conf.pkgconf.version
  // 加载controller
  let ctrPath = conf.controllers || path.join(conf.root, 'controllers')
  try {
    let controllers = requrieDir(ctrPath)
    isError(!Object.keys(controllers).length, 'Run a application without controller')

    Object.keys(controllers).forEach(key => {
      let controller = controllers[key]
      // 普通控制器
      if (!controller.swagger$$schema) {
        isError(_.isEmpty(controller), 'The controller ' + key + ' may export some action.')
        return
      }
      generateHandles(controller.swagger$$schema.apis, controller, path.join(ctrPath, key + '.js'))
    })

    conf.controllers = controllers
  } catch (e) {
    isError(true, e)
  }

  // 加载定义的额外Model
  let externalModels = []
  let modelNames = schemas.map(schema => schema.name)
  if (conf.models) {
    let models = requrieDir(conf.models)
    Object.keys(models).forEach(key => {
      let model = models[key]

      isError(!model.name, 'Have a model without name.')
      // 如果Model定义了apis属性，则会在controllers目录下找同名的controller文件
      model.apis && isError(!conf.controllers[key], 'Can\'t find ' + key + '.js file in directory ' + ctrPath)
      // 生成中间件
      model.apis && generateHandles(model.apis, conf.controllers[key], path.join(conf.models, key + '.js'))

      isError(modelNames.indexOf(_.capitalize(model.name)) !== -1, 'Model name ' + model.name + ' has be defined.')

      externalModels.push(model)
      modelNames.push(key)
    })
  }

  schemas.push(...externalModels)

  conf.models = schemas
  conf.routes = routes
  return conf
}
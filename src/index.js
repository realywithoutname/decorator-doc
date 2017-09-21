const model = require('./model')
const router = require('./router')
const get = require('./config')
const path = require('path')
const {isError, isKoa} = require('./helper')
const serverStatic = require('./static')
const validate = require('./validate')
let instance = null
let _config = {}
/**
 *
 * @param {Object} config 自定义信息
 * config.host 服务器地址，默认127.0.0.1。
 * config.port 监听端口，默认3000
 * config.basePath API前缀，默认为v+应用版本号
 * config.pkgconf package.json文件地址或者配置对象
 * config.models 配置的model集合，额外不需要控制器的Model和未使用修饰器语法的项目的Model,如果Model定义了apis属性，则会在controller目录下找同名的controller文件。默认为项目下的models文件夹
 * config.controllers 控制器文件所在文件夹。默认为项目下的controllers文件夹
 */
function generator(config = {}) {
  if (instance) {
    return instance
  }
  config.use = config.use || 2
  config.root = config.root || process.cwd()
  _config = config = get(config)

  const Builder = require('./builder/v' + config.use)

  instance = new Builder(config)

  return instance
}
generator.autoRoute = function (router) {

  isError(!router, 'router parameter miss.')

  let routes = _config.routes
  router.get('/swagger-ui/docs', function () {
    if (isKoa(this, arguments)) {
      let self = this === global ? arguments[0] : this
      self.body = instance
    } else {
      arguments[1].send(instance)
    }
  })

  router.get('/swagger-ui*', serverStatic(path.join(__dirname, '../')))

  Object.keys(routes).forEach(url => {
    let { method, controller, target } = routes[url]
    let swagger = instance.paths[url][method]
    url = path.join(_config.basePath + '/' + url).replace(/\{\s*(\w+)?\s*\}/g, ($1, $2) => ':' + $2).replace(/\\/g, '/')
    router[method](url, validate(swagger, controller))
  })
}

generator.model = model

generator.router = router

module.exports = generator
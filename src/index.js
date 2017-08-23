const model = require('./model')
const schema = require('./schema')
const router = require('./router')
const get = require('./config')
const path = require('path')
const serverStatic = require('koa-static')
let instance = null
/**
 *
 * @param {Object} config 自定义信息
 * config.host 服务器地址，默认127.0.0.1。
 * config.port 监听端口，默认3000
 * config.basePath API前缀，默认为v+应用版本号
 * config.pkgconf package.json文件地址或者配置对象
 * config.models 配置的model集合，额外不需要控制器的Model和未使用修饰器语法的项目的Model,如果Model定义了apis属性，则会在controller目录下找同名的controller文件。默认为项目下的models文件夹
 * config.controllers 控制器文件所在文件夹。默认为项目下的controllers文件夹
 * config.router 应用框架所使用的路由组件
 */
function generator(config = {}) {
  if (instance) {
    return instance
  }
  config.use = config.use || 2
  config.root = config.root || process.cwd()
  config = get(config)

  const Builder = require('./builder/v' + config.use)

  instance = new Builder(config)

  let router = config.router
  let routes = config.routes
  // 如果有router参数，则自动配置路由
  if (router) {

    router.get('/swagger-ui/docs', function (ctx) {
      ctx.body = instance
    })

    router.get('/swagger-ui*', serverStatic(path.join(__dirname, '../')))

    Object.keys(routes).forEach(url => {
      let route = routes[url]
      url = path.join(config.basePath + '/' + url).replace(/\{\s*(\w+)?\s*\}/g, ($1, $2) => ':' + $2).replace(/\\/g, '/')
      router[route.method](url, route.action)
    })
  }

  return instance
}

generator.model = model

generator.schema = schema

generator.router = router

module.exports = generator
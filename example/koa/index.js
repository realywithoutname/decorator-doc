const Koa = require('koa')
const config = require('config')
const Router = require('koa-router')
const Example = require('./controllers/example')
const Demo = require('./controllers/demo')
const serverStatic = require('koa-static')
const { builder } = require('../../src')
const path = require('path')
const fs = require('fs')

const { host, port } = config.get('server')
let app = new Koa()
let router = new Router()
builder.doc()

router.get('/docs', function (ctx) {
  ctx.body = builder.doc()
})

router.get('/swagger-ui*', serverStatic(path.join(__dirname, '../../')))
app.use(serverStatic(path.join(__dirname, '../../swagger-ui')))
app.use(router.routes())
app.listen(port, () => console.log('open http://' + host + ':' + port))
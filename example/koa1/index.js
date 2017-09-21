const koa = require('koa')
const parser = require('koa-body-parser')
const config = require('config')
const router = require('koa-router')()
const docGenerator = require('../../src')

let app = koa()

app.use(parser())

let doc = docGenerator()

app.use(router.routes())

docGenerator.autoRoute(router)

const { host, port } = config.get('server')
app.listen(port, () => console.log('open http://' + host + ':' + port))
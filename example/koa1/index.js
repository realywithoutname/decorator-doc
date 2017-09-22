const koa = require('koa')
const parser = require('koa-body-parser')
const config = require('config')
const router = require('koa-router')()
const docGenerator = require('../../src')
const knexLoader = require('../../../swagger-mysql-builder')


let app = koa()

app.use(parser())

let doc = docGenerator()
app.use(knexLoader(doc, true))
app.use(router.routes())

docGenerator.autoRoute(router)

const { host, port } = config.get('server')
app.listen(port, () => console.log('open http://' + host + ':' + port))
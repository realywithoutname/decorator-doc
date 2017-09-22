const Koa = require('koa')
const config = require('config')
const Router = require('koa-router')
const docGenerator = require('../../src')

let app = new Koa()
let router = new Router()

docGenerator()
docGenerator.autoRoute(router)

app.use(router.routes())

const { host, port } = config.get('server')
app.listen(port, () => console.log('open http://' + host + ':' + port))
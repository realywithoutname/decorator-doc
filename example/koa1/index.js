const koa = require('koa')
const config = require('config')
const router = require('koa-router')()
const docGenerator = require('../../src')

let app = koa()

docGenerator({ router })
app.use(router.routes())

const { host, port } = config.get('server')
app.listen(port, () => console.log('open http://' + host + ':' + port))
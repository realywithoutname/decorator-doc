const express = require('express')
const config = require('config')
const Router = require('koa-router')
const docGenerator = require('../../src')

let app = new express()
docGenerator({ router: app })

const { host, port } = config.get('server')
app.listen(port, () => console.log('open http://' + host + ':' + port))
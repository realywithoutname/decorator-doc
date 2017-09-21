const express = require('express')
const config = require('config')
const Parser = require('body-parser')
const docGenerator = require('../../src')
const knexLoader = require('swagger-mysql-builder')
let app = new express()

app.use(Parser.json())
app.use(Parser.urlencoded({ extended: false }))

app.use(knexLoader(docGenerator(), true))

docGenerator.autoRoute(app)

const { host, port } = config.get('server')
app.listen(port, () => console.log('open http://' + host + ':' + port))
const express = require('express')
const config = require('config')
const Parser = require('body-parser')
const docGenerator = require('../../src')

let app = new express()

app.use(Parser.json())
app.use(Parser.urlencoded({ extended: false }))

docGenerator({ router: app })
const { host, port } = config.get('server')
app.listen(port, () => console.log('open http://' + host + ':' + port))
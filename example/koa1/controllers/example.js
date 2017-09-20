const { model, router } = require('../../../src')
const Joi = require('joi')
@model('Example model')
@model.props({
  id: Joi.number().description('Example Id').integer().required(),
  name: Joi.string().description('Example name').required()
})
class Example {
  @router({ query: [] })
  @router.get('/examples')
  @router.response.array()
  @router.join({
    page: Joi.number().description('Page index').integer(),
    size: Joi.number().description('Page size').integer()
  })
  @router.query(
    [
      'id',
      'name',
      'page',
      'size'
    ]
  )
  @router.required(['id', 'name'])
  find(req, res) {

  }
  @router('Update example document by id')
  @router.put('/examples/{id}')
  @router.body(['name'])
  @router.join('Demo', ['id as demoId'])
  @router.response(['id'])
  update() {
  }
}

module.exports = Example
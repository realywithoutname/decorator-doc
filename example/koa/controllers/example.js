const { model, schema, router } = require('../../../src')
@model('Example model')
@model.props({
  id: schema('Example Id').integer('integer').required(),
  name: schema('Example name').string('string').required()
})
class Example {
  @router({ query: [] })
  @router.get('/examples')
  @router.response.array()
  @router.join({
    page: schema('Page index').integer(),
    size: schema('Page size').integer()
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
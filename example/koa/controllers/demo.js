const { model, schema, router } = require('../../../src')

@model('Demo model')
@model.props({
  id: schema('Demo Id').integer('integer').required(),
  name: schema('Demo name').string('string').required(),
  createTime: schema('Demo create time').dateTime()
})
class Demo {
  @router('Demo find')
  @router.get('/Demos')
  @router.response.array()
  find(req, res) {

  }

  @router('Update Demo document by id')
  @router.put('/Demos/{id}')
  @router.body(['name'])
  @router.response(['id'])
  update() {

  }
}

module.exports = Demo
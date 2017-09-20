const { model, router } = require('../../../src')
const Joi = require('joi')
@model('Demo model')
@model.props({
  id: Joi.number().description('Demo Id').required(),
  name: Joi.string().description('Demo name').required(),
  createTime: Joi.date().description('Demo create time')
})
class Demo {
  @router('Demo find')
  @router.get('/Demos')
  @router.required(['id'])
  @router.response.array()
  find(req, res) {
    res.send([{ id: 0 }])
  }

  @router('Update Demo document by id')
  @router.put('/Demos/{id}')
  @router.body(['name', {
    name: 'examples',
    type: 'array',
    props: ['id', 'name']
  }])
  @router.response(['id'])
  update() {

  }
}

module.exports = Demo
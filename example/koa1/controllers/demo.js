const { model, router } = require('../../../src')
const Joi = require('joi')
@model('Demo model')
@model.props({
  id: Joi.number().integer().description('Demo Id').required(),
  name: Joi.string().description('Demo name').required(),
  createTime: Joi.date().description('Demo create time')
})
class Demo {
  @router('Demo find')
  @router.get('/Demos')
  @router.required(['id'])
  @router.response.array()
  async find(ctx) {
    ctx.body = [{ id: 0 }]
  }

  @router('Update Demo document by id')
  @router.put('/Demos/{id}')
  @router.body(['name', {
    name: 'examples',
    type: 'array',
    props: ['id', 'name']
  }])
  @router.response(['id'])
  update (ctx) {
    console.log(ctx.request.body, 2)
    ctx.body = []
  }
}

module.exports = Demo
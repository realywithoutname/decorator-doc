const Joi = require('joi')
module.exports = {
  name: 'Page',
  description: '分页信息字段',
  properties: {
    page: Joi.number().integer().description('当前页码'),
    size: Joi.number().integer().description('每页显示条数'),
    count: Joi.number().integer().description('记录总量')
  }
}
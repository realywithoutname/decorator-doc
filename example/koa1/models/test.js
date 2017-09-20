const Joi = require('joi')
module.exports = {
  name: 'Test',
  description: 'Test Model',
  properties: {
    id: Joi.number().integer().description('test id').required(),
    prop1: Joi.string().description('test property one'),
    prop2: Joi.string().description('test property two'),
    prop3: Joi.string().description('test property three'),
    prop4: Joi.string().description('test property four'),
    created: Joi.date().iso().description('test property four')
  },
  apis: {
    find: {
      method: 'get',
      description: 'find all tast',
      path: '/test',
      query: ['id', 'prop1'],
      response: {
        type: 'array',
        props: [
          'id',
          'prop1',
          'prop2',
          'prop3',
          'created',
          {
            name: 'list',
            type: 'array',
            props: ['id']
          }
        ]
      }
    }
  }
}
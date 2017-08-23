const { schema } = require('../../../src')
module.exports = {
  name: 'Test',
  description: 'Test Model',
  properties: {
    id: schema('test id').integer().required(),
    prop1: schema('test property one').string(),
    prop2: schema('test property two').string(),
    prop3: schema('test property three').string(),
    prop4: schema('test property four').string(),
    created: schema('test property four').dateTime()
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
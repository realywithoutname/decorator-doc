const { info } = require('../../../src')
module.exports = {
  name: 'Test',
  description: 'Test Model',
  properties: {
    id: info.integer().desc('test id').required(),
    prop1: info.string().desc('test property one'),
    prop2: info.string().desc('test property two'),
    prop3: info.string().desc('test property three'),
    prop4: info.string().desc('test property four'),
    created: info.dateTime().desc('test property four')
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
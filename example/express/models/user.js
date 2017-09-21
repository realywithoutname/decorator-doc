const Joi = require('joi')
module.exports = {
  name: 'User',
  description: 'User Model',
  properties: {
    id: Joi.number().integer().description('User id'),
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  },
  apis: {
    login: {
      method: 'post',
      body: {
        type: 'object',
        props: ['email', 'password']
      },
      path: '/login'
    }
  }
}
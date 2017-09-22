const Joi = require('joi')
const {model, router} = require('../../../src')

@model('Book Model')
@model.props({
  id: Joi.number().integer().description('Book id'),
  name: Joi.string().required().description('Book name'),
  anthor: Joi.string().description('Book anthor'),
  publishedAt: Joi.date().timestamp('javascript').description('Book publish time')
})
class Book {
  @router('Get book list')
  @router.get('/books')
  @router.join('Page', ['page', 'size', 'count'])
  @router.query(['name', 'anthor'])
  @router.response([{
    name: 'books',
    type: 'array',
    props: ['id', 'name', 'anthor']
  }, {
    name: 'pageInfo',
    type: 'object',
    props: ['page', 'size', 'count']
  }])
  async find (ctx) {
    ctx.body = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          books: [{
            id: 1,
            name: 'Book 1'
          }, {
            id: 2,
            name: 'Book 2'
          }],
          pageInfo: {
            page: 1,
            size: 10,
            count: 2
          }
        })
      }, 1000)
    })
  }
}

module.exports = Book
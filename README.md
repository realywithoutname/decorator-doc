# Swagger your application

## INTRODUCTION

一个[swagger](https://swagger.io)文档生成及验证接口调用的工具，以极简单的方式配置可视化，可测试的API文档。

支持两种配置方式：使用ES7 decorator或使用普通JavaScript对象。

## USE IT
你可以直接参考[示例](/example)学习使用这个工具。下面进行简单介绍如何使用。

### INSTALL
在你的项目中安装它
~~~
  $ npm i decorator-doc --save
~~~

### IMPORTANT FOLDER
- controllers `required` 这个文件夹定义Model和API（使用ES7 decorator语法时）以及处理程序。
- config `required` 这个文件夹下定义服务器配置信息。
- models `optional` 这个文件夹定义一些Model，如果使用JSON方式配置API和Model信息，则必须有该文件夹。

> 具体请查看[文档](/API.md#swdobject-config)中要求。

### EXAMPLE
- USE DECORATOR
~~~ javascript
  // controllers/example.js
  @model('Example Model')
  @model.props({
    id: Joi.number().description('Example id'),
    name: Joi.string().description('Example name')
  })

  class Example () {
    @router('Find example list')
    @router.get('/examples')
    @router.join('Page', ['size', 'index', 'count'])
    @router.response([{
      type: 'array',
      name: 'data',
      props: ['id', 'name']
    }, {
      type: 'object',
      name: 'pageInfo',
      props: ['size', 'index', 'count']
    }])
    async find (ctx) {
      ctx.body = {
        data: [{
          id: 1,
          name: 'Example 1'
        }],
        pageInfo: {
          page: 1,
          size: 10,
          count: 1
        }
      }
    }
  }

  module.exports = Example
~~~
> 需要注意的是在使用ES7 decorator语法定义的controller中，每个controller都会被添加一个名为`swagger$$schema`的静态属性，他表示当前controller的Model。

- USE JSON

~~~ javascript
  // models/example.js
  model.exports = {
    name: 'Example',
    description: 'Example Model',
    properties: {
      id: Joi.number().description('Example id'),
      name: Joi.string().description('Example name')
    },
    apis: {
      find: {
        method: 'GET',
        path: '/examples',
        refs: {
          size: {key: 'size', model: 'Page'},
          index: {key: 'index', model: 'Page'},
          count: {key: 'count', model: 'Page'}
        },
        response: {
          type: 'object',
          props: [{
            type: 'array',
            name: 'data',
            props: ['id', 'name']
          }, {
            type: 'object',
            name: 'pageInfo',
            props: ['size', 'index', 'count']
          }]
        }
      }
    }
  }
  // controllers/example.js
  class Example () {
    async find (ctx) {
      ctx.body = {
        data: [{
          id: 1,
          name: 'Example 1'
        }],
        pageInfo: {
          page: 1,
          size: 10,
          count: 1
        }
      }
    }
  }

  module.exports = Example
~~~
### RUN
在你的项目中使用它

如果使用ES7 decorator语法，你还需要安装Babel插件。使用JavaScript对象定义请参照[这里](/docs/config.md)
~~~
  $ babel-plugin-transform-decorators-legacy
~~~

并在.babelrc中添加这个插件

~~~
{
  "plugins": ["transform-decorators-legacy"]
}
~~~

### BEAUTY

如果你想让decorator语法高亮不一样，你可以试试在你打开的vscode中添加一个`.vscode/settings.json`（也可以使用设置面板），复制下面信息，可以修改为你想要高亮颜色
~~~ json
  {
    "editor.tokenColorCustomizations": {
      "textMateRules": [
        {
          "scope": "keyword.operator.decorator.js",
          "settings": {
            "foreground": "#ff0000"
          }
        },
        {
          "name": "class.decorator",
          "scope": "variable.other.readwrite.decorator.js",
          "settings": {
            "foreground": "#89898560"
          }
        },
        {
          "name": "class.decorator.property",
          "scope": "variable.other.property.decorator.js",
          "settings": {
            "foreground": "#89898560"
          }
        }
      ]
    }
  }
~~~

如果你使用了代码检测，那么decorator语法可能会显示错误哦，记得在项目中配置`jsconfig.json`
~~~ json
  {
    "compilerOptions": {
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true
    }
  }
~~~
## API
点击查看[API文档](/API.md)

## FEATURE

[这里](/docs/feature.md)查看





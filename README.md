# Swagger your application

## INTRODUCTION

一个[swagger](https://swagger.io)文档生成工具，以极简单的方式配置可视化，可测试的API文档。

支持两种配置方式：使用ES7 decorator或使用普通JavaScript对象。

## USE
还没有发布到npm（捂脸），假设这个工具叫`decorator-doc`

### INSTALL
在你的项目中安装它
~~~
  $ npm i decorator-doc --save
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
然后你就可以运行一下应用了

- controller
  ~~~ JavaScript
    const { model, schema, router } = require('decorator-doc')

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
    }

    module.exports = Demo
  ~~~

- entry
  ~~~ JavaScript
    const Koa = require('koa')
    const Router = require('koa-router')
    const docGenerator = require('decorator-doc')

    let app = new Koa()
    let router = new Router()

    docGenerator({ router })
    app.use(router.routes())

    app.listen(3000)
  ~~~
### NOTE
需要注意的是在使用ES7 decorator语法定义的controller中，每个controller都会被添加一个名为`swagger$$schema`的静态属性，他表示当前controller的Model。

### vscode
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

如果你使用了代码检测，那么decorator语法可能会显示错误哦，记得在项目中配置`.jsconfig.json`
~~~ json
  {
    "compilerOptions": {
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true
    }
  }
~~~
## API DOC
- [config](/docs/config.md)
- [model](/docs/model.md)
- [router](/docs/router.md)
- [schema](/doc/schema.md)

## FEATURE
- router.join 该方法不能满足一下需求
期望
~~~ javascript
{
  id: "model id",
  list: [
    {
      id: "other id"
    }
  ]
}
~~~
因为在join的时候不能在同一个Model拥有相同的属性，所以这里定义时必须使用别名
~~~
@router.join('othor', ['id as otherId'])
~~~
上面的结果就会是
~~~ javascript
{
  id: "model id",
  list: [
    {
      otherId: "other id"
    }
  ]
}
~~~

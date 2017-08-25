
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
    const { model, info, router } = require('decorator-doc')

    @model('Demo model')
    @model.props({
      id: info.integer('integer').required().desc('Demo Id'),
      name: info.string('string').required().desc('Demo name'),
      createTime: info.dateTime().desc('Demo create time')
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

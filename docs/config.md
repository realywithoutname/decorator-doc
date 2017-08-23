### builder(Object: config)
- `required` 通过使用该接口生成一个完整的swagger文档。
  - host 服务器地址，默认127.0.0.1(这个地址必须和浏览器中使用地址同域，否则会出现跨域)
  - port 监听端口，默认3000
  - root 项目根目录
  - basePath API前缀，默认为v+应用版本号
  - pkgconf package.json文件地址，默认为项目根目录下的package.json
  - models 配置的model集合，额外不需要控制器的Model和未使用修饰器语法的项目的Model,如果Model定义了apis属性，则会在controller目录下找同名的controller文件
  - controllers 控制器文件所在文件夹。默认为项目下的controllers文件夹
  - router 应用框架所使用的路由组件，如果传入该参数，则会自动为应用配置所有在swagger文档中定义的API。(目前只用了koa 2.0测试)
  - use 可以是2和3，分别对应swagger 2.0和swagger 3.0
> host，port，basePath，pkgconf, controllers， models参数会通过[config](https://github.com/lorenwest/node-config)来获取`server`属性得到，所以可以在应用目录下config目录中定义而不需要在使用时传入。
> 项目根目录 通过`process.cwd()`获取
> pkgconf 获取package.json的目的是获取应用信息，作者信息以及license信息。
> router 如果不配置该属性，可以在`decorator-doc/swagger-ui`获取UI文件，并配置`/swagger-ui/docs`路由返回swagger文档

### JavaScript Object
使用JavaScript对象的方式，主要在不希望使用ES7 decorator语法的项目定义Model以及定义一些公用的Model(不在数据库中，但是常常接口又需要)。
使用这种方式定义的Model，必须配置`models`属性，在没有配置的项目中工具不会自动去加载这个目录。
在Model中配置的其他信息，工具不会使用也不会修改。
使用这种方式配置的Model将会在controller目录下查找同名的文件作为controller，并在controller中查找同名的处理函数(如果controller export一个class或者function，将使用new创建新实例进行查找)
~~~ JavaScript
{
  name: String,
  description: String,
  properties: {
    [property]: Schema // property 属性名称，Schema可以使用schema接口定义
  },
  apis: { // 没有该属性的Model不必需拥有自己的controller文件
    [action]: { // action 必须与controller中的方法同名
      path: String,
      method: String,
      description: string,
      query: Array,
      body: Array,
      response: {
        type: 'array' | 'object',
        props: Array
      }
    }
  }
}
~~~
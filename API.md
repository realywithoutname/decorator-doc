# API Reference

- [Swd()](#swdobject-config)
  - [autoRoute(Object: router)](#autorouteobject-router)
  - [model(String: description, String: name)](#modelstring-description-string-name)
    - [model.props(Object: props)](#modelpropsobject-props)
    - [model.isAdditional(Boolean: isAdditional)](#modelisadditionalboolean-isadditional)
  - [router(String: description | Object: options)](#routerstring-description--object-options)
    - [router.get(String: path)](#routerget-string-path)
    - [router.put(String: path)](#routerget-string-path)
    - [router.post(String: path)](#routerget-string-path)
    - [router.delete(String: path)](#routerget-string-path)
    - [router.options(String: path)](#routerget-string-path)
    - [router.head(String: path)](#routerget-string-path)
    - [router.patch(String: path)](#routerget-string-path)
    - [router.trace(String: path)](#routerget-string-path)
    - [router.join(String: modelName | Object: newProperties, Array: properties)](#routerjoin-string-modelname--object-newproperties-array-properties)
    - [router.query(Array: props)](#routerquery-array-props)
    - [router.body(Array: props)](#routerbody-array-props)
    - [router.body.array(Array: props)](#routerbodyarray-array-props)
    - [router.required(Array: props)](#routerrequired-array-props)
    - [router.response(Array: props)](#routerresponse-array-props)
    - [router.response.array(Array: props)](#routerresponse-array-props)
    - [router.deprecated(Boolean: deprecated)](#routerdeprecatedboolean-deprecated--30)

# Swd(Object: config)
- `required` 通过使用该接口生成一个完整的swagger文档。
  - host 服务器地址，默认127.0.0.1(这个地址必须和浏览器中使用地址同域，否则会出现跨域)
  - port 监听端口，默认3000
  - root 项目根目录
  - basePath API前缀，默认为v+应用版本号
  - pkgconf package.json文件地址，默认为项目根目录下的package.json
  - models 配置的model集合，额外不需要控制器的Model和未使用修饰器语法的项目的Model,如果Model定义了apis属性，则会在controller目录下找同名的controller文件
  - controllers 控制器文件所在文件夹。默认为项目下的controllers文件夹
  - use 可以是2和3，分别对应swagger 2.0和swagger 3.0
> host，port，basePath，pkgconf, controllers， models参数会通过[config](https://github.com/lorenwest/node-config)来获取`server`属性得到，所以可以在应用目录下config目录中定义而不需要在使用时传入。

> 项目根目录 通过`process.cwd()`获取

> pkgconf 获取package.json的目的是获取应用信息，作者信息以及license信息。

## autoRoute(Object: router)
- `optional` 设置所有API对应的route，添加自动验证。

> router 如果不配置该属性，可以在`decorator-doc/swagger-ui`获取UI文件，并配置`/swagger-ui/docs`路由返回swagger文档

## model(String: description, String: name)
- `required` 在需要定义API的类中是必须的。
  - description `required` Model描述
  - name `optional` Model名称，默认为类名,在没有类名或需要自定义名称时很有用

### model.props(Object: props)
- `optional` 定义Model的属性。可多次定义
  - props `required` Map(string: property, Schema: Joi) Model属性。
    - property 属性名称
    - Joi [joi](https://github.com/hapijs/joi)实例

~~~ javascript
  // use js decorator
  @model.props({
    id: Joi.number(),
    name: Joi.string()
  })
  // same as json
  {
    properties: {
      id: Joi.number(),
      name: Joi.string()
    }
  }
~~~

### model.isAdditional(Boolean: isAdditional)
- `optional` 标注Model是否为附加的（和数据库不相关的）。一般不会用，这里添加该方法的主要原因是为了根据Model中properties的定义来生成数据库Schema。

##  router(String: description | Object: options)
- `required` 定义一个API。
  - description `optional` 接口描述。为了更好的描述以及阅读推荐使用该参数
  - options `optional` 接口配置对象，对以下接口的简写。为了代码的美观以及便于阅读，不推荐这样使用。

###  router.get (String: path)
- `optional` 定义API通过`GET`访问，其他几个接口定义不同类型的API。
  - path `required` 定义接口访问路径（部分），完整路径由`config.basePath`，`config.host`，`path`决定。
> trace为`3.0`版本可用接口。如果一个API没有定义任何http访问方式，那么将生成swagge.json失败，即'get','put','post','delete','options','head','patch','trace'这些方法必须有一个被使用。

###  router.join (String: modelName | Object: newProperties, Array: properties)
- `optional` 链接除该Model属性以外的Model属性，该接口可多次使用。
  - modelName `required` 需要链接的Model名。
  - newProperties `required` 对于不在属性集合中定义的新属性，可以像使用[model.props](/model#model-props)定义属性一样定义。定义该属性后，第二个参数将失效，新的属性集合将于当前Model属性集合合并为新的属性集合，只对该API有效。
  - properties `optional` 链接的Model属性名集合，链接进来的属性集合将和当前Model属性集合合并为新的属性集合，只对该API有效。对于可能重名的属性名可使用`as`进行重命名，如果不定义该参数，则默认会链接所有的属性名，并使用原来的属性名，属性名与当前Model中属性名重复时将会报错，不会覆盖，生成swagge.json失败。

~~~ javascript
  // use js decorator
  @router.join('User', ['id as userId'])
  @router.join({
    page: Joi.number()
  })
  // same as json
  {
    refs: {
      userId: {key: 'id', model: 'User'},
      page: Joi.number()
    }
  }
~~~

###  router.query (Array: props)
- `optional` 定义API可接受的查询参数列表。
  - props `optional` 该API可接受参数集合，默认为所有该API下的属性集合。
> 对于在URL中作为`paramter`的参数将自动从URL中解析及属性集合中获取对应的属性，如果在属性集合中找不到对应属性将会导致错误，生成swagge.json失败。

###  router.body (Array: props)
- `optional` 定义API可接受的Body参数列表，body中的数据为JSON对象格式。
  - props `optional` 该API可接受参数集合，默认为所有该API下的属性集合。数组中元素可以是一个代表属性的字符串，也可以是一个对象。对象需要满足一下条件，其中`prop`代表一个对象元素。
    - prop.name `required` 属性名称
    - prop.type `optional` 类型，可以是array 或 object,默认为'object'
    - prop.props `required` 该属性包含拥有属性列表，其中元素与上级`props`元素一样。
    - prop.description `optional` 描述信息

~~~ JavaScript
  // use js decorator
  @router.body(['name', { type: 'object', name: 'data', props: ['title', 'desc']}])
  // same as json
  {
    body: {
      type: 'object',
      props: ['name', { type: 'object', name: 'data', props: ['title', 'desc']}]
    }
  }
  // valid request body
  // {name: 'string', data: {title: 'string', desc: 'string'}}
~~~

> 对于在URL中作为`paramter`的参数将自动从URL中解析及属性集合中获取对应的属性，如果在属性集合中找不到对应属性将会导致错误,生成swagge.json失败。

###  router.body.array (Array: props)
- 同上，使用该方法定义的接口表示可接受一组`props`格式的数据。

~~~ JavaScript
  // use js decorator
  @router.body.array(['name', { type: 'array', name: 'data', props: ['title', 'desc']}])
  // same as json
  {
    body: {
      type: 'array',
      props: ['name', { type: 'array', name: 'data', props: ['title', 'desc']}]
    }
  }
  // valid request body
  // {name: 'string', data: [{title: 'string', desc: 'string'}]}
~~~

> `router.body`和`router.body.array`方法在一个API只能使用一个，后定义的将覆盖先定义的。

###  router.required (Array: props)
- `optional` 定义API可接受参数的必须项列表。
  - props `optional` 必须项列表，默认为空数组。（对于在URL中作为`paramter`的参数默认且必须是必须项，不需要在这里定义。）


###  router.response (Array: props)
- `optional` 定义API响应内容,默认为当前API已有属性集合。（只支持以`json`格式）
  - props `optional` 返回字段列表，默认为当前Model的所有属性集合。数组中元素可以是一个代表属性的字符串，也可以是一个对象。对象需要满足一下条件，其中`prop`代表一个对象元素。
    - prop.name `required` 属性名称
    - prop.type `optional` 类型，可以是array 或 object,默认为'object'
    - prop.props `required` 该属性包含拥有属性列表
    - prop.description `optional` 描述信息

~~~ JavaScript
  // use js decorator
  @router.response(['name', { name: 'to', type: 'array', props: ['name', 'id'] }])
  // same as json
  {
    response: {
      type: 'object',
      props: ['name', { name: 'to', type: 'array', props: ['name', 'id'] }]
    }
  }
  // valid response data
  {
    name: 'string',
    to: [{
      name: 'string',
      id: 'string'
    }, {
      name: 'string',
      id: 'string'
    }]
  }
~~~

> 如果在属性集合中找不到对应属性将会导致生成swagger.json失败

###  router.response.array (Array: props)
- `optional` 定义API响应内容,默认为当前API已有属性集合列表。（只支持以`json`格式）
  - props `optional` 返回字段，默认为当前Model的所有属性集合列表。数组中元素可以是一个代表属性的字符串，也可以是一个对象。对象需要满足一下条件，其中`prop`代表一个对象元素。
    - prop.name `required` 属性名称
    - prop.type `optional` 类型，可以是array 或 object,默认为'object'
    - prop.props `required` 该属性包含拥有属性列表
    - prop.description `optional` 描述信息

~~~ JavaScript
  // use js decorator
  @router.response.array(['name', 'userId', { name: 'to', type: 'object', props: ['name', 'id'] }])
  // same as json
  {
    response: {
      type: 'array',
      props: ['name', 'userId', { name: 'to', type: 'array', props: ['name', 'id'] }]
    }
  }
  // valid response data
  [{
    name: 'string',
    userId: 'string',
    to: [{
      name: 'string',
      id: 'string'
    }, {
      name: 'string',
      id: 'string'
    }]
  }]
~~~

> `router.body`和`router.body.array`方法在一个API只能使用一个，后定义的将覆盖先定义的。
> 如果在属性集合中找不到对应属性将会导致生成swagger.json失败

###  router.deprecated(Boolean: deprecated)  `3.0`
- `optional` 定义API是否废弃，默认为`false`
  - deprecated `optional` 默认值为`true`



## model(String: description, String: name)
- `required` 在需要定义API的类中是必须的。
  - description `required` Model描述
  - name `optional` Model名称，默认为类名,在没有类名或需要自定义名称时很有用
~~~javascript
const {model} = require('decorator-doc')
@model('Example APIs')
class Example {
  ...
}
~~~

## model.props(Object: props)
- `optional` 定义Model的属性。可多次定义
  - props `required` Map(string: property, Schema) Model属性
~~~javascript
const {model, schema} = require('decorator-doc')
@model('Example APIs')
@model.props({
  id: schema('Example Id').required().integer(),
  name: schema('Example name').string()
})
// 上面的效果与下面的效果一样
@model.props({
  id: schema('Example Id').required().integer(),
})
@model.props({
  name: schema('Example name').string()
})
class Example {
  ...
}
~~~

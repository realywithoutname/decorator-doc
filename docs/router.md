## router(String: description | Object: options)
- `required` 定义一个API。
  - description `optional` 接口描述。为了更好的描述以及阅读推荐使用该参数
  - options `optional` 接口配置对象，对以下接口的简写。为了代码的美观以及便于阅读，不推荐这样使用。
- 示例见该节文档末尾
## router.get (String: url)
- `optional` 定义一个`GET`API，以下几个接口定义不同类型的API。
  - url `required` 定义
- 示例见该节文档末尾
## router.put (String: url)

## router.post (String: url)

## router.delete (String: url)

## router.options (String: url)

## router.head (String: url)

## router.patch (String: url)

## router.trace (String: url)

## router.join (String: modelName | Object: newProperties, Array: properties)
- `optional` 链接除该Model属性以外的Model属性，该接口可多次使用。
  - modelName `required` 需要链接的Model名。
  - newProperties `required` 对于不在属性集合中定义的新属性，可以使用`Map(String: property: Schema)`定义。定义该属性后，第二个参数将失效，新的属性集合将于当前Model属性集合合并为新的属性集合，只对该API有效。。
  - properties `optional` 链接的Model属性名集合，链接进来的属性集合将和当前Model属性集合合并为新的属性集合，只对该API有效。对于可能重名的属性名可使用`as`进行重命名，如果不定义该参数，则默认会链接所有的属性名，并使用原来的属性名，属性名与当前Model中属性名重复时将会报错，不会覆盖。
- 示例见该节文档末尾

## router.query (Array: props)
- `optional` 定义API可接受的查询参数列表。
  - props `optional` 该API可接受参数集合，默认为所有该API下的属性集合。（对于在URL中作为`paramter`的参数将自动从URL中解析及属性集合中获取对应的属性，如果在属性集合中找不到对应属性将会导致错误）
- 示例见该节文档末尾

## router.body (Array: props)
- `optional` 定义API可接受的Body参数列表。
  - props `optional` 该API可接受参数集合，默认为所有该API下的属性集合。（对于在URL中作为`paramter`的参数将自动从URL中解析及属性集合中获取对应的属性，如果在属性集合中找不到对应属性将会导致错误）
- 示例见该节文档末尾

## router.required (Array: props)
- `optional` 定义API可接受参数的必须项列表。
  - props `optional` 必须项列表，默认为空数组。（对于在URL中作为`paramter`的参数默认且必须是必须项）
- 示例见该节文档末尾

## router.response (Array: props)
- `optional` 定义API响应内容,默认为当前API已有属性集合。（只支持以`json`格式）
  - props `optional` 返回字段，默认为当前API的所有属性集合。

## router.response.array (Array: props)
- `optional` 定义API响应内容,默认为当前API已有属性集合列表。（只支持以`json`格式）
  - props `optional` 返回字段，默认为当前API的所有属性集合列表。

~~~javascript
const {model, schema, router} = require('decorator-doc')
@model('Example APIs')
@model.props({
  id: schema('Example Id').required().integer(),
  name: schema('Example name').string(),
  createTime: schema('The example document created time').dataTime(),
  updateTime: schema('The example document last updated time').dataTime()
})
class Example {
  @router('Find all example documents')
  @router.get('/examples')
  @router.query(
    [
      'id',
      'name',
      {
        limit: schema('Limit documents length').integer().default(10),
        offset: schema('Skip some documents').integer().default(0)
      }
    ]
  )
  @router.resonse('array')
  find (req, res) {
    ...
  }

  @router('Update a example document')
  @router.put('/examples/{id}')
  updateById (req, res) {
    ...
  }
}
~~~
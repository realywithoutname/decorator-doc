### <a name="model"></a>model(String: description, String: name)
- `required` 在需要定义API的类中是必须的。
  - description `required` Model描述
  - name `optional` Model名称，默认为类名,在没有类名或需要自定义名称时很有用

### <a name="model-props"></a>model.props(Object: props)
- `optional` 定义Model的属性。可多次定义
  - props `required` Map(string: property, Schema) Model属性。
    - property 属性名称
    - Schema [Schema](#Schema)实例


### <a name="Schema">Schema</a>
Schema 中方法与swagger文档对应，其中设置数据类型的方法为swagger所支持的数据类型。详细信息可见文档，其中标注3.0的表示2.0不支持。
> 见[swagger 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md),[swagger 3.0](https://swagger.io/specification/#schemaObject)

> 所有的方法调用顺序不做要求，但是在一个实例只能调用一次，否则会报错哦。

#### 方法
  - title
  - multipleOf
  - maximum
  - exclusiveMaximum
  - minimum
  - exclusiveMinimum
  - maxLength
  - minLength
  - pattern
  - maxItems
  - minItems
  - uniqueItems
  - maxProperties
  - minProperties
  - required
  - enum
  - allOf
  - oneOf `3.0`
  - anyOf `3.0`
  - not `3.0`
  - items
  - properties
  - additionalProperties
  - format
  - default
  - nullable `3.0`
  - discriminator
  - readOnly
  - writeOnly
  - xml
  - externalDocs
  - example
  - deprecated `3.0`

#### 例外
为了在编程中更方便，增加了一些属性，其中description改为了desc，type写成方法时改为setType

  - integer
  - long
  - float
  - double
  - string
  - byte
  - binary
  - boolean
  - date
  - dateTime
  - password
  - desc
  - setType

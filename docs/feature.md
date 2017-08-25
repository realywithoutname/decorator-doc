### 希望内部支持所有的`node.js`框架的路由

### router.join 该方法不能满足一下需求

期望得到的数据或者传输的数据
~~~ javascript
{
  id: "model id",
  list: [
    {
      id: "other id",
      name: "other name"
    }
  ]
}
~~~
因为在join的时候不能在同一个Model拥有相同的属性，所以这里定义时必须使用别名
~~~
@router.join('Othor', ['id as otherId', 'name'])
@router.response([
  id,
  {
    name: "list",
    description: "list",
    props: ['otherId', 'name']
  }
])
~~~
上面的结果就会是
~~~ javascript
{
  id: "model id",
  list: [
    {
      otherId: "other id",
      name: "other name"
    }
  ]
}
~~~

是不是可以这样呢？

~~~ JavaScript
@router.join('Othor', ['id', 'name'])
@router.join('Anothor as Anothors', ['id', 'name'])
@router.response([
  id,
  anothor: ['id', 'name'], // 返回对象
  Anothors: [['id', 'name']] // 返回数组
])
~~~
# Swagger your application

## INTRODUCTION

一个[swagger](https://swagger.io)文档生成工具，以极简单的方式配置可视化，可测试的API文档。

支持两种配置方式：使用ES7 decorator或使用普通JavaScript对象。

## USE IT

你可参考快速[使用](/docs/start.md)文档以及[示例](/example)学习使用这个工具。

## API DOC
- [config](/docs/config.md)
- [model](/docs/model.md)
- [router](/docs/router.md)
- [info](/docs/info.md)
- [schema](/doc/schema.md)

## [FEATURE](/docs/feature.md)

## IMPORTANT CHANGE LOG

- [commit cf473c8c85b1fd06df662011a7074b5326aaaef1](/commit/cf473c8c85b1fd06df662011a7074b5326aaaef1)
  - 支持Swagger 2.0(`验证通过`)和Swagger 3.0(未验证)文档生成

- [commit cb9f1a16ba4c8cca8ad7be2a7768a058adbcb893](/commit/cb9f1a16ba4c8cca8ad7be2a7768a058adbcb893)
  - 修复删除`src/meta.js`的bug
  - 新增[info](/docs/info.md)API
  - 修改[schema](/docs/schema.md)对象

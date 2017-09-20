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
- [schema](/doc/schema.md)`废弃`
> 原Schema的所有功能已使用[Joi](https://github.com/hapijs/joi)替代，使用方法请查看[Joi文档](https://github.com/hapijs/joi/blob/v11.0.2/API.md)

## FEATURE

[这里](/docs/feature.md)查看

## IMPORTANT CHANGE LOG

- [commit cf473c8c85b1fd06df662011a7074b5326aaaef1](/commit/cf473c8c85b1fd06df662011a7074b5326aaaef1)
  - 支持Swagger 2.0(`验证通过`)和Swagger 3.0(未验证)文档生成

- [commit cb9f1a16ba4c8cca8ad7be2a7768a058adbcb893](/commit/cb9f1a16ba4c8cca8ad7be2a7768a058adbcb893)
  - 修复删除`src/meta.js`的bug
  - 新增[info](/docs/info.md)API
  - 修改[schema](/docs/schema.md)对象

- [commit 335da731f461e0732dfb4e8c71fb7aa7dd6890ec](/commit/335da731f461e0732dfb4e8c71fb7aa7dd6890ec)
  - 支持多种框架，通过`express`,`koa 1.x`,`koa 2.x`
  - `koa 1.x`中controller中同时使用`Generator`和`Decorator`会出错，待解决。
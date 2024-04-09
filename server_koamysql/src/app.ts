// node搭配ts设置路径别名 https://www.cnblogs.com/gogechang/p/17894865.html
import 'module-alias/register'
import koa, { Context } from 'koa'
// import body from 'koa-body'
// import json from 'koa-json'
// import Router from 'koa-router'
// import userRouter from './router/user'

import allRouterLoader from './common/AllRouterLoader'
import { success, fail } from './common/ResResult'
// import DbConfig from './conf/DbConfig'
// console.log(DbConfig.getConf('user'))

const app = new koa()
// 把请求错误和成功的统一处理，用中间件的方式挂载到context上
app.use(async (ctx: Context, next: koa.Next) => {
  ctx.resSuccess = success
  ctx.resFail = fail
  await next()
})

allRouterLoader.init(app)

// const router = new Router()
// // 为所有的路由访问添加路由前缀/dang 来作为一级路由
// router.prefix('/dang')

// router.get('/test', async (ctx: koa.Context, next: koa.Next) => {
//   // ctx:为请求结果的上下文ContextDelegatedResponse body为请求反回的数据
//   ctx.body = '第一个测试页面'
//   // ctx.app为上面的全局对象 const app = new koa()，被封装在每个请求的上下文对象中
//   // ctx.app.context 为全局的上下文
// })
// app.use(json())
// app.use(body())

// // 把userRouter加到一级路由中
// // http://localhost:3002/dang/usermodule/findUserinfo/张三
// router.use(userRouter.routes(), userRouter.allowedMethods())

// // 加载路由到全局路由上
// app.use(router.routes())
// app.listen(3002)
// console.log('server running on prot 3002')

// // 启动访问 http://localhost:3002/dang/test

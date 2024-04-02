# koa mysql

## 在TS中使用esModule的方法引用nodejs模块
 - 安装 npm i ts-node -S 并用ts-node执行代码
 ```
 "scripts": {
    "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
  },
 ```
 - 在tsconfig.json中配置相关几项
 ```
   "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "esModuleInterop": true, // 允许依赖库中出export=这种兼容规范导出的格式，ts可以用import from导入
  }
 ```

## 安装Koa等依赖
```
npm install koa -S
npm install @types/koa -S
// 支持post请求依赖
npm install koa-body -S
// 支持响应数据对象转json格式的依赖
npm i koa-json -S
npm i @types/koa-json -S
// 路由器依赖
npm i koa-router -S
npm i @types/koa-router -S
// token依赖
npm i jsonwebtoken -S
npm i @types/jsonwebtoken -S
// javascript实用工具库
npm i @types/lodash -S
// 日志依赖
npm i log4js -S
// 支持访问mysql数据库依赖
npm i mysql -S
npm i @types/mysql -S
// 装饰器元数据
npm i reflect-metadata -S
// ORM映射工具依赖
npm i sequelize -S
npm i sequelize-typescript -S
// 自动检测文件变化后自动重启依赖
npm i nodemon -S
// typescript + ts-node依赖
npm i typescript -S
npm i ts-node -S

```
复制粘贴到控制台，共19个依赖
```
npm install koa -S
npm install @types/koa -S
npm install koa-body -S
npm i koa-json -S
npm i @types/koa-json -S
npm i koa-router -S
npm i @types/koa-router -S
npm i jsonwebtoken -S
npm i @types/jsonwebtoken -S
npm i @types/lodash -S
npm i log4js -S
npm i mysql -S
npm i @types/mysql -S
npm i reflect-metadata -S
npm i sequelize -S
npm i sequelize-typescript -S
npm i nodemon -S
npm i typescript -S
npm i ts-node -S
```

## 配置启动脚本【热部署】
```
// 当我们用nodemon启动项目后 nodemon会监听src/下的ts文件有更改，就调用ts-node命令来执行 ./src/app.ts
"scripts": {
    "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
}
```

## 常规app.ts文件编码【先用常规写法，后面再逐步升级】

### 实现一级路由 src/app.ts
```
import koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'

const app = new koa()
const router = new Router()
router.prefix('/dang') // 为所有的路由访问添加路由前缀/dang 来作为一级路由

router.get('/test', async (ctx: koa.Context, next: koa.Next) => {
  // ctx:为请求结果的上下文ContextDelegatedResponse body为请求反回的数据
  ctx.body = '第一个测试页面'
  // ctx.app为上面的全局对象 const app = new koa()，被封装在每个请求的上下文对象中
  // ctx.app.context 为全局的上下文
})
router.use(json())
router.use(body())

// 加载路由到全局路由上
app.use(router.routes())
app.listen(3002)
console.log('server running on prot 3002')

// 启动访问 http://localhost:3002/dang/test
```
### 实现二级路由 src/router/user.ts
- 第一步 编写二级路由user.ts
```
import { Context } from 'koa'
import Router from 'koa-router'
const router = new Router()

router.prefix('/usermodule')
router.get('/findUserinfo/:username', async (ctx: Context) => {
  const { username } = ctx.params
  ctx.body = `您好：${username}`
})

export default router
```

- 第二步 在app.ts中引入，把user路由加到一级路由app.ts中
```
import koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'
import userRouter from './router/user'

const app = new koa()
const router = new Router()
router.prefix('/dang')

router.get('/test', async (ctx: koa.Context, next: koa.Next) => {
  ctx.body = '第一个测试页面'
})
router.use(json())
router.use(body())

// 把userRouter加到一级路由中
router.use(userRouter.routes(), userRouter.allowedMethods())

app.use(router.routes())
app.listen(3002)
console.log('server running on prot 3002')

// 启动访问  http://localhost:3002/dang/usermodule/findUserinfo/张三

```
### 实现 post 请求
```
// user.ts中
router.post('/addUser', async (ctx: Context) => {
  const user: Userinfo = ctx.request.body
  ctx.body = `您好：${user.username}, 年龄：${user.age}`
})
```
### 避免新增路由时，总要手动在app.ts中手动添加，手写自动路由加载
- 手动添加示例：router.use(userRouter.routes(), userRouter.allowedMethods())
- 已有requireDirectory路由自动加载工具，手写自动路由加载，是因为它对TS支持不友好

- 新建 自动加载工具文件 src\common\AllRouterLoader.ts
```
import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'

class AllRouterLoader {
  app!: Koa
  // 设置成单例模式，用于保证对象的唯一
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    // console.log(this.getAbsoluteFilePaths())
    this.app = app
    const rootRouter = this.loadAllRouterWrapper()

    // 4.加载路由到全局路由上
    this.app.use(rootRouter.routes())

    // 5.监听方法
    this.listen()
  }
  // 1.加载路由文件夹src/router下的，所有路由文件名数组
  getFiles(dir: string) {
    return fs.readdirSync(dir)
  }
  // 2.加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    // 获取当前执行环境地址，拼接路由文件夹地址
    // 'D:\study-project\viteProject\server_koamysq\src\router'
    const dir: string = path.join(process.cwd(), '/src/router')

    // ['user.ts', 'books.ts']
    const allFiles: string[] = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      const fullFilePath = dir + '\\' + file
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }
  // 3.加载所有一级路由到二级路由中
  loadAllRouterWrapper() {
    // 3.0 获取一级路由
    const rootRouter = this.rootRouter()
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 3.2 调用加载所有二级路由到一级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter
  }
  // 3.0 获取一级路由
  rootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }
  // 自定义守卫
  isRouter(data: any): data is Router {
    return data instanceof Router
  }
  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }
  listen() {
    this.app.listen(3002)
    console.log('在3002端口监听...')
  }
}

export default AllRouterLoader.allRouterLoader

```
- 修改src/router/user.ts中的导出方式，改用node的方式module.exports=
```
// export default router

// src\common\AllRouterLoader.ts 中使用require导入所有二级路由文件，所以改用node方法导出
module.exports = router
```
- 在app.ts入口文件中导入引用, 并删除其他多余代码，只保留如下
```
import koa from 'koa'
import allRouterLoader from './common/AllRouterLoader'

const app = new koa()
allRouterLoader.init(app)

```

### 搭建Aop全局通用异常
通用异常处理中间件src\common\GlobalException.ts

```
// 在src\common\AllRouterLoader.ts中引入使用，挂载到全局app上

init(app: Koa) {
  // 因为koa中间件洋葱模型原因
  // 加载通用异常中间件到全局，且必须在挂载路由之前
  this.app.use(globalException)
  // 加载路由到全局路由上的操作，需在加载通用异常中间件 之后
  this.app.use(rootRouter.routes())

}

```
- koa中间件洋葱模型
```
import koa from 'koa'
const app = new koa()

const middleware1 = async (ctx: Context, next: koa.Next) => {
  console.log('第一个中间件开始')
  await next()
  console.log('第一个中间件结束')
}
const middleware2 = async (ctx: Context, next: koa.Next) => {
  console.log('第二个中间件开始')
  await next()
  console.log('第二个中间件结束')
}
const middleware3 = async (ctx: Context, next: koa.Next) => {
  console.log('第三个中间件开始')
  await next()
  console.log('第三个中间件结束')
}
app.use(middleware1)
app.use(middleware2)
app.use(middleware3)

# 执行的结果顺序: 

第一个中间件开始
第二个中间件开始
第三个中间件开始
第三个中间件结束
第二个中间件结束
第一个中间件结束
```
### 响应成功和失败的精简封装
```
enum Code {
  SUCCESS = 200,
  SERVERERROR = 500,
}

export class ResResult {
  static success(data: any = undefined, msg: any = '') {
    const code: Code = Code.SUCCESS
    return { data, msg, code }
  }
  static fail(msg: any = '') {
    const code: Code = Code.SERVERERROR
    return { undefined, msg, code }
  }
}

export let { success, fail } = ResResult

```
在app.ts中用中间件的方式挂载
```
import koa, { Context } from 'koa'
import { success, fail } from './common/ResResult'
const app = new koa()
// 把请求错误和成功的统一处理，用中间件的方式挂载到context上
app.use(async (ctx: Context, next: koa.Next) => {
  ctx.resSuccess = success
  ctx.resFail = fail
  await next()
})
```

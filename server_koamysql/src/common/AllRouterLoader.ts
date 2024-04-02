import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa, { Context } from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import globalException from './GlobalException'

class AllRouterLoader {
  app!: Koa
  // 设置成单例模式，用于保证对象的唯一
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    // console.log(this.getAbsoluteFilePaths())
    this.app = app
    const rootRouter = this.loadAllRouterWrapper()

    // 加载通用异常中间件到全局
    this.app.use(globalException)
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
    // rootRouter.use(json())
    // rootRouter.use(body())

    // router.use() 中的中间件只会在该路由对象及其子路由定义的路由中使用
    // app.use() 中的中间件会在整个应用程序中使用，所有的请求，不论请求的路径是什么。

    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }
  // 自定义守卫，参数为any
  // 返回值的类型被明确指定为 data is Router 使用了Ts的类型谓词
  // 表示这个函数用来判断 data 是否为 Router 类型。
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

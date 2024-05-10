import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa, { Context } from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import globalException from './GlobalException'
import { sequelize } from '@modules/BaseDao'
import koaJwt from 'koa-jwt'
import MyJwt from './MyJwt'
import HandleInvalidToken, { uncheckedPathsRegExps } from './HandleInvalidToken'

class AllRouterLoader {
  app!: Koa
  // 设置成单例模式，用于保证对象的唯一
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    this.app = app
    this.loadMiddleAware() // 加载中间件
    this.storeRootRouterToCtx() // 保存根路由
    // 调用一下 BaseDao中的方法，使其能够执行addModels方法，加载所有decormodel模型，
    // 因为有可能没有用到sequelize.define方式定义模型, 所以提前调用一下
    sequelize.query

    this.loadAllCtrlRouterWrapper() // 加载控制器路由

    this.listen() // 监听
  }
  loadMiddleAware() {
    this.app.use(json())
    this.app.use(body())
    this.app.use(globalException)
    // 处理无效token的中间件
    this.app.use(HandleInvalidToken)
    // jwt认证中间件 及密钥
    this.app.use(koaJwt({ secret: MyJwt.secret }).unless({ path: uncheckedPathsRegExps }))
  }
  storeRootRouterToCtx() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.use(rootRouter.routes())

    this.app.context.rootRouter = rootRouter
  }
  getFiles(dir: string) {
    return fs.readdirSync(dir)
  }
  getAbsoluteFilePaths() {
    // 获取当前执行环境地址，拼接路由文件夹地址
    // 'D:\study-project\viteProject\server_koamysq\src\controller'
    const dir: string = path.join(process.cwd(), '/src/controller')
    // ['CtgyController.ts']
    const allFiles: string[] = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      if (this.isCtrlFile(file)) {
        const fullFilePath = dir + '/' + file
        allFullFilePaths.push(fullFilePath)
      }
    }
    return allFullFilePaths
  }
  isCtrlFile(file: string) {
    // 文件名
    // const fileName: string = file.substring(file.lastIndexOf('\\') + 1, file.lastIndexOf('.'))
    const fileName = path.basename(file, path.extname(file))
    // 扩展名
    const extensionName: string = file.substring(file.lastIndexOf('.') + 1, file.length)
    return fileName.indexOf('Controller') !== -1 && extensionName === 'ts'
  }
  loadAllCtrlRouterWrapper() {
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // console.log('allFullFilePaths:', allFullFilePaths)
    this.loadAllRouter(allFullFilePaths)
  }
  loadAllRouter(allFullFilePaths: string[]) {
    for (let fullFilePath of allFullFilePaths) {
      require(fullFilePath)
    }
  }
  listen() {
    let port: number = 0
    const curEnv = process.env.NODE_ENV || 'dev'
    curEnv === 'dev' ? 'dev' : 'prod'

    // 端口 开发环境用3002 生产用8002
    port = curEnv === 'dev' ? 3002 : 8002

    this.app.listen(port)
    console.log(`在${port}端口监听ing...`)
  }
}

export default AllRouterLoader.allRouterLoader

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
    this.app = app
    this.loadMiddleAware() // 加载中间件
    this.storeRootRouterToCtx() // 保存根路由
    this.loadAllCtrlRouterWrapper() // 加载控制器路由

    this.listen() // 监听
  }
  loadMiddleAware() {
    this.app.use(json())
    this.app.use(body())
    this.app.use(globalException)
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
        const fullFilePath = dir + '\\' + file
        allFullFilePaths.push(fullFilePath)
      }
    }
    return allFullFilePaths
  }
  isCtrlFile(file: string) {
    // 文件名
    const fileName: string = file.substring(file.lastIndexOf('\\') + 1, file.lastIndexOf('.'))
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
    this.app.listen(3002)
    console.log('在3002端口监听ing...')
  }
}

export default AllRouterLoader.allRouterLoader
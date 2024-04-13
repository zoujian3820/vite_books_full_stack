import 'reflect-metadata'
// import Router from 'koa-router'
import AllCtrlRouterLoader from '@/common/AllCtrlRouterLoader'
type MehtodType = 'get' | 'post' | 'put' | 'delete'

export function Controller(modulePath: string = '/') {
  function getFullPath(reqPath: string) {
    modulePath = modulePath && modulePath.trim()
    if (modulePath) {
      if (modulePath.length > 0) {
        if (!modulePath.startsWith('/')) {
          modulePath = '/' + modulePath
        } else if (modulePath === '/') {
          modulePath = ''
        }
      }
    }
    // /ctgymodule + /findSecThirdCtgys/:firstctgyid
    return modulePath + reqPath
  }
  return function (targetClass: { new (...args: any): any }) {
    // console.log(
    //   'eee',
    //   Reflect.getMetadataKeys(targetClass.prototype),
    //   targetClass.prototype,
    //   targetClass.prototype.findSecThrdCtgys
    // )

    // const router = new Router()
    // router.prefix(modulePath)

    // 1 获取原型上的请求方法, ts中发现prototype获取不到类的方法属性名
    // Object.keys(targetClass.prototype).forEach((methodname) => {
    Reflect.getMetadataKeys(targetClass.prototype).forEach((methodname) => {
      //   console.log('methodname', methodname)

      // 2 根据方法名获取具体的方法体
      const routerHandlerFn = targetClass.prototype[methodname]
      //   console.log(routerHandlerFn)

      // 3 获取请求路径和请求类型，根路由对象
      const reqPath: string = Reflect.getMetadata('path', targetClass.prototype, methodname)
      // http://localhost:3002/dang/ctgymodule/findSecThirdCtgys/1
      const fullReqPath = getFullPath(reqPath)
      const reqMethodType: MehtodType = Reflect.getMetadata(
        'methodType',
        targetClass.prototype,
        methodname
      )

      // 4 实现路由请求
      const rootRouter = AllCtrlRouterLoader.app.context.rootRouter
      if (fullReqPath && reqMethodType) {
        // router[reqMethodType](reqPath, routerHandlerFn) // 使用模块路由
        rootRouter[reqMethodType](fullReqPath, routerHandlerFn) // 直接带模块前缀挂载全局路由
      }
    })

    // const rootRouter = AllCtrlRouterLoader.app.context.rootRouter
    // 注册模块路由到全局路由
    // rootRouter.use(router.routes(), router.allowedMethods())
  }
}

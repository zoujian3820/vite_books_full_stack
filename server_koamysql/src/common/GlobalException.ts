// 全局通用异常处理
import koa, { Context } from 'koa'
import { fail, Code } from './ResResult'
import logger from './LogUtil'
// import MyJwt from '@/common/MyJwt'
// interface Req_ {
//   url: string
//   method: string
//   headers: { [k: string]: string }
// }

/*******************自身手写的 jwt 鉴权**************************************/
/* 
// 忽略路径
const uncheckedPaths = ['/login', '/register']

const globalException = async (ctx: Context, next: koa.Next) => {
  // const context = ctx.app.context
  // console.log('进入中间件通用异常')
  logger.info('进入中间件通用异常')
  try {
    const Req = ctx.request as any as Req_
    const tokenFmtErrMsg = 'token格式错误, 请检查是否添加 Bearer 前缀'
    const tokenEmptyMsg = 'token不存在, 您可能没有登录'
    // 检查路径是否在忽略路径中
    if (!uncheckedPaths.find((path) => Req.url.indexOf(path) !== -1)) {
      // 请求头没有userid，或者请求头没有authorization，或者请求头authorization不是以 Bearer 开头， 都将抛出 JsonWebTokenError 异常
      const userid = parseInt(Req.headers.userid) || -1
      const authorization = (Req.headers.authorization || '').trim()

      if (authorization) {
        // authorization是 Bearer + ' ' + jwt字符串
        const parts = authorization.split(' ')
        const scheme = parts[0]
        const token = parts[1]
        // 判断 authorization 请求头是不是以 Bearer 开头
        const isSchemeToken = /^Bearer$/i.test(scheme)
        if (isSchemeToken && token) {
          // 验证token
          await MyJwt.verifyJWTToken(token)
          // console.log('jwt data:', data)
        } else {
          ctx.body = fail(!isSchemeToken ? tokenFmtErrMsg : tokenEmptyMsg, Code.UNAUTHORIZEDERROR)
          return
        }
      } else {
        ctx.body = fail(tokenEmptyMsg, Code.UNAUTHORIZEDERROR)
        return
      }
    }

    await next()
  } catch (error: any) {
    const err = error as { name: string; message: string }
    logger.info(`全局异常处理: ${err.message}, error.name: ${err.name}`)

    switch (error.name) {
      case 'JsonWebTokenError':
        // ctx.status = Code.UNAUTHORIZEDERROR
        ctx.body = fail('这是一个非法的token', Code.UNAUTHORIZEDERROR)
        break
      case 'TokenExpiredError':
        // ctx.status = Code.UNAUTHORIZEDERROR
        ctx.body = fail('token已过期', Code.UNAUTHORIZEDERROR)
        break
      case 'UnauthorizedError':
        // ctx.status = Code.UNAUTHORIZEDERROR
        ctx.body = fail('未授权', Code.UNAUTHORIZEDERROR)
        break
      case 'ValidationError':
        // ctx.status = Code.PARAMERROR
        ctx.body = fail('参数错误', Code.PARAMERROR)
        break
      case 'ForbiddenError':
        // ctx.status = Code.FORBIDDENERROR
        ctx.body = fail('禁止访问', Code.FORBIDDENERROR)
        break
      default:
        // ctx.status = Code.SERVERERROR
        ctx.body = fail(`服务器错误: ${err.message}`, Code.SERVERERROR)
        break
    }
  }
}

*/

/**********改用 koa-jwt 中间件的方式，不用自身手写的鉴权了 ********************/
const globalException = async (ctx: Context, next: koa.Next) => {
  // 当后面的中间件出现异常，这里将捕获到异常，并返回给客户端，后面的中间件就包插 koa-jwt
  // 在src\common\AllCtrlRouterLoader.ts的 loadMiddleAware 方法中
  /*
  loadMiddleAware() {
    this.app.use(globalException)
    this.app.use(HandleInvalidToken)
    // jwt认证中间件 及密钥
    this.app.use(koaJwt({ secret: 'xxxxxx' }))
  }
  */
  await next().catch((err) => {
    logger.info(`全局异常处理: ${err.message}, error.name: ${err.name}`)
    if (err.status === 401) {
      // ctx.status = 401
      // 返回type值为 expired_token 表示access_token过期 前端应该 发起token续期请求
      ctx.body = fail('这是不合法或过期token', Code.UNAUTHORIZEDERROR, 'expired_token')
    } else {
      ctx.body = fail(`服务器错误: ${err.message}`, Code.SERVERERROR)
    }
  })
}

export default globalException

/**
 * 校验token是否有效，是否为最新token
 * 在登出和注销用户等场景下，jwt 本身无法处理已失效token，需要手动校验
 * 此中间件借助 redis 实现, 接口调用方在 headers 中需要传递 userid 参数
 */
import koa, { Context } from 'koa'
import { fail, Code } from './ResResult'
// import logger from './LogUtil'
import MyJwt from '@/common/MyJwt'
interface Req_ {
  url: string
  method: string
  headers: { [k: string]: string }
}

export const uncheckedPathsRegExps = [
  // 登录和注册接口都不需要校验token登录
  /^\/dang\/usermodule\/login/,
  /^\/dang\/usermodule\/register/,
  // 三级分类模块都不校验token登录
  /^\/dang\/ctgymodule/
]

export default async (ctx: Context, next: koa.Next) => {
  const Req = ctx.request as any as Req_
  const isUncheckPath = uncheckedPathsRegExps.find((reg) => reg.test(Req.url))

  if (!isUncheckPath) {
    const userid = parseInt(Req.headers.userid) || -1
    const authorization = (Req.headers.authorization || '').trim()
    // authorization是 Bearer + ' ' + jwt字符串
    const parts = authorization.split(' ')
    const token = parts[1]

    if (!userid) {
      ctx.body = fail('userid不能为空', Code.UNAUTHORIZEDERROR, 'invalid_token')
      return
    }

    if (!(await MyJwt.checkIfTokenExists(token, userid))) {
      ctx.body = fail('token已失效', Code.UNAUTHORIZEDERROR, 'invalid_token')
      return
    }
  }

  await next()
}

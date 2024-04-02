import koa, { Context } from 'koa'
import { success, fail } from './ResResult'

const globalException = async (ctx: Context, next: koa.Next) => {
  // const context = ctx.app.context
  console.log('进入中间件通用异常')
  try {
    await next()
  } catch (error: any) {
    const err = error as { message: string }
    ctx.body = fail(`服务器错误: ${err.message}`)
  }
}

export default globalException

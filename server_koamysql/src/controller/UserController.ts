import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
import userinfoService from '@/modules/userinfo/service/userinfoService'
import { Code } from '@/common'

@Controller('/usermodule')
export default class UserController {
  @post('/login')
  async login(ctx: Context) {
    const { username, password } = ctx.request.body
    const userinfo = await userinfoService.login(username, password)
    if (userinfo?.userid) {
      ctx.body = ctx.resSuccess(userinfo)
    } else {
      ctx.body = ctx.resFail('用户名或密码错误')
    }
  }
  @post('/loginRenewal')
  async loginRenewal(ctx: Context) {
    const { userid, access_token, refresh_token } = ctx.request.body
    const newAccess_token = await userinfoService.loginRenewal(userid, access_token, refresh_token)
    if (newAccess_token) {
      ctx.body = ctx.resSuccess(newAccess_token)
    } else {
      ctx.body = ctx.resFail('登录已过期', Code.FORBIDDENERROR, 'invalid_token')
    }
  }
}

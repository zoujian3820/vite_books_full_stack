import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
import userinfoService from '@/modules/userinfo/service/userinfoService'

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
}

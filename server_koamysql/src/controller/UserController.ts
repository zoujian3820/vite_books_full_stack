import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
import userinfoService from '@/modules/userinfo/service/userinfoService'
import { Code } from '@/common'

@Controller('/usermodule')
export default class UserController {
  @get('/getCaptcha')
  async getCaptcha(ctx: Context) {
    const captcha = await userinfoService.getCaptcha()
    ctx.body = ctx.resSuccess(captcha)
  }

  @post('/login')
  async login(ctx: Context) {
    const { username, password, captcha, encrypCaptcha, captchaId } = ctx.request.body
    const userinfo = await userinfoService.login({
      username,
      password,
      captcha,
      encrypCaptcha,
      captchaId
    })
    if (typeof userinfo === 'object' && userinfo.userid) {
      ctx.body = ctx.resSuccess(userinfo)
    } else {
      // ctx.body = ctx.resFail('用户名或密码错误')
      ctx.body = ctx.resFail(userinfo)
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

  @post('/registeredUsers')
  async registeredUsers(ctx: Context) {
    const { username, password, captcha, encrypCaptcha, captchaId } = ctx.request.body
    const userinfo = await userinfoService.registeredUsers({
      username,
      password,
      captcha,
      encrypCaptcha,
      captchaId
    })

    if (typeof userinfo === 'object' && userinfo.userid) {
      ctx.body = ctx.resSuccess(userinfo)
    } else {
      // ctx.body = ctx.resFail('用户已存在，请更换用户名')
      ctx.body = ctx.resFail(userinfo)
    }
  }
}

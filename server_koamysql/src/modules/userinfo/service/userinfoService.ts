import path from 'path'
import UserDao, { Userinfo } from '../dao/UserDao'
import MyJwt from '@/common/MyJwt'
// import logger from '@/common/LogUtil'

import svgCaptcha from 'svg-captcha-fixed'
// https://github.com/lingsamuel/svg-captcha/blob/HEAD/README_CN.md

import Md5 from 'md5'
import { v4 as uuidv4 } from 'uuid'
const captSecret = 'k4G@93y&7'
function createEncrypCaptcha(captcha: string) {
  const uuid = uuidv4()
  const encrypCaptcha = Md5(captcha + captSecret + uuid)
  return { captchaText: encrypCaptcha, captchaId: uuid }
}

function verifyCaptcha(captcha: string, encrypCaptcha: string, captchaId: string) {
  return Md5(captcha + captSecret + captchaId) === encrypCaptcha
}

class UserinfoService {
  static userinfoService: UserinfoService = new UserinfoService()

  async getCaptcha() {
    // 更换字体
    await svgCaptcha.loadFont(
      path.join(process.cwd(), '/src/static/font/TASAOrbiterText-Regular.otf')
    )
    const { text, data } = svgCaptcha.create({
      size: 4, // 4个字母
      ignoreChars: '0o1il', // 验证码字符中排除 0o1i
      noise: 4, // 几条干扰线条
      color: true, // 文字颜色
      fontSize: 16, // 文字大小
      width: 100, // 宽度
      height: 40, // 高度
      background: '#cc9966' // 背景颜色
      // mathMin: 6,
      // mathMax: 43
    })

    // data: string // svg 路径
    // text: string // 验证码文字

    const { captchaText, captchaId } = createEncrypCaptcha(text)
    return { text: captchaText, data, captchaId }
  }
  async registeredUsers(params: {
    username: string
    password: string
    captcha: string
    encrypCaptcha: string
    captchaId: string
  }) {
    if (!verifyCaptcha(params.captcha, params.encrypCaptcha, params.captchaId)) return '验证码错误'
    const userinfo: Userinfo = await UserDao.findOneUser(params.username, params.password)
    if (!userinfo?.userid) {
      const dbUserinfo: Userinfo = await UserDao.addUser({
        username: params.username,
        password: params.password
      } as any as Userinfo)
      return MyJwt.getLoginUserinfo(dbUserinfo)
    } else {
      return '用户已存在，请更换用户名'
    }
  }
  async login(params: {
    username: string
    password: string
    captcha: string
    encrypCaptcha: string
    captchaId: string
  }) {
    // captcha: string, encrypCaptcha: string, captchaId: string
    if (!verifyCaptcha(params.captcha, params.encrypCaptcha, params.captchaId)) return '验证码错误'
    const userinfo: Userinfo = await UserDao.findOneUser(params.username, params.password)

    if (!userinfo?.userid) return '用户名或密码错误'

    // // access_token 有效期 1小时
    // const access_token = await MyJwt.createJWTToken(userinfo, '1h')
    // // 创建新的token，立将其存储在Redis中，保持token的有效性
    // await MyJwt.setRedisJwtToken(userinfo.userid, access_token)
    // // refresh_token 有效期 15天
    // const refresh_token = await MyJwt.createJWTToken(userinfo, '15d')
    // // await MyJwt.setRedisJwtToken(userinfo.userid, token)
    // return { ...userinfo, access_token, refresh_token }
    return MyJwt.getLoginUserinfo(userinfo)
    // } else {
    //   // throw new Error('用户名或密码错误')
    //   return null
    // }
  }
  // 登录续期 刷新 access_token
  async loginRenewal(userid: number, access_token: string, refresh_token: string) {
    // access_token 为最新的情况下
    if (await MyJwt.checkIfTokenExists(access_token, userid)) {
      try {
        // 校验当前 refresh_token 是否过期
        const userinfo: Userinfo = await MyJwt.verifyJWTToken(refresh_token)
        // logger.info()
        // console.log('userinfo==>', userinfo)

        if (userinfo?.userid) {
          const newAccess_token = await MyJwt.createJWTToken(userinfo, '1h')
          // 创建新的token，立将其存储在Redis中，保持token的有效性
          await MyJwt.setRedisJwtToken(userinfo.userid, newAccess_token)
          return { ...userinfo, access_token: newAccess_token, refresh_token }
        }
      } catch (error: any) {
        console.log('jwt过期error==>', error)
      }
    }
  }
}

export default UserinfoService.userinfoService

import UserDao, { Userinfo } from '../dao/UserDao'
import MyJwt from '@/common/MyJwt'
// import logger from '@/common/LogUtil'

class UserinfoService {
  static userinfoService: UserinfoService = new UserinfoService()
  async login(username: string, password: string) {
    const userinfo: Userinfo = await UserDao.findOneUser(username, password)
    if (userinfo?.userid) {
      // access_token 有效期 1小时
      const access_token = await MyJwt.createJWTToken(userinfo, '1h')
      // 创建新的token，立将其存储在Redis中，保持token的有效性
      await MyJwt.setRedisJwtToken(userinfo.userid, access_token)
      // refresh_token 有效期 15天
      const refresh_token = await MyJwt.createJWTToken(userinfo, '15d')
      // await MyJwt.setRedisJwtToken(userinfo.userid, token)
      return { ...userinfo, access_token, refresh_token }
    } else {
      // throw new Error('用户名或密码错误')
      return null
    }
  }
  // 登录续期 刷新 access_token
  async loginRenewal(userid: number, access_token: string, refresh_token: string) {
    // access_token 为最新的情况下
    if (await MyJwt.checkIfTokenExists(access_token, userid)) {
      // 校验当前 refresh_token 是否过期
      const userinfo: Userinfo = await MyJwt.verifyJWTToken(refresh_token)
      // logger.info()
      // console.log('userinfo==>', userinfo)

      if (userinfo?.userid) {
        const newAccess_token = await MyJwt.createJWTToken(userinfo, '1h')
        // 创建新的token，立将其存储在Redis中，保持token的有效性
        await MyJwt.setRedisJwtToken(userinfo.userid, newAccess_token)
        return { ...userinfo, access_token: newAccess_token, refresh_token }
      } else {
        return null
      }
    }
  }
}

export default UserinfoService.userinfoService

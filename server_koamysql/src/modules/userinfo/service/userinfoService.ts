import UserDao, { Userinfo } from '../dao/UserDao'
import MyJwt from '@/common/MyJwt'

class UserinfoService {
  static userinfoService: UserinfoService = new UserinfoService()
  async login(username: string, password: string) {
    const userinfo: Userinfo = await UserDao.findOneUser(username, password)
    if (userinfo?.userid) {
      const token = await MyJwt.createJWTToken(userinfo)
      // await MyJwt.setRedisJwtToken(userinfo.userid, token)
      return { ...userinfo, token }
    } else {
      // throw new Error('用户名或密码错误')
      return null
    }
  }
}

export default UserinfoService.userinfoService

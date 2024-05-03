import UserDao, { Userinfo } from '../dao/UserDao'
import JwtSecret from '@/common/JwtSecret'

class UserinfoService {
  static userinfoService: UserinfoService = new UserinfoService()
  async login(username: string, password: string) {
    const userinfo: Userinfo = await UserDao.findOneUser(username, password)
    if (userinfo?.userid) {
      await JwtSecret.setSecret(userinfo.userid)
      const token = await JwtSecret.createJWTToken(userinfo)
      return { ...userinfo, token }
    } else {
      // throw new Error('用户名或密码错误')
      return null
    }
  }
}

export default UserinfoService.userinfoService

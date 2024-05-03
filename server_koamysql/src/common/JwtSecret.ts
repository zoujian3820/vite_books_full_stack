import jwt, { JwtPayload } from 'jsonwebtoken'
import RedisUtil from './RedisUtil'
import { Userinfo } from '@/modules/userinfo/dao/UserDao'

class JwtSecret {
  static jwtSecret: JwtSecret = new JwtSecret()
  secret: string = 'K6xLBPZ7lW'
  async getSecret(userid: number): Promise<string> {
    return await RedisUtil.hget('jwtSecret', `key${userid}`)
  }
  async setSecret(userid: number): Promise<string> {
    // const secret = generateRandomString(10)
    const secret = this.secret
    return await RedisUtil.hset('jwtSecret', `key${userid}`, secret)
  }
  async deleteSecret(userid: number) {
    // 如登出、注销帐户等操作，都需要删除对应的 secret，使先前的 token 失效
    await RedisUtil.hdel('jwtSecret', `key${userid}`)
  }
  async createJWTToken(userinfo: Userinfo) {
    const secret = await this.getSecret(userinfo.userid)
    // 生成JWT Token
    const token: string = jwt.sign({ data: userinfo }, secret, {
      expiresIn: '1h',
      header: { alg: 'HS256', typ: 'JWT' }
    })
    return token
  }
  async verifyJWTToken(token: string, userid: number) {
    // 验证JWT Token
    const secret = await this.getSecret(userid)
    const decoded = jwt.verify(token, secret) as JwtPayload
    return decoded.data
  }
}

export function generateRandomString(length: number): string {
  // 生成一个长度为 length 的随机字符串
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default JwtSecret.jwtSecret

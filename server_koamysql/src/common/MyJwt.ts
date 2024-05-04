import jwt, { JwtPayload } from 'jsonwebtoken'
import RedisUtil from './RedisUtil'
import { Userinfo } from '@/modules/userinfo/dao/UserDao'
// import logger from './LogUtil'

class MyJwt {
  static myJwt: MyJwt = new MyJwt()
  secret: string = 'K6xLBPZ7lW'
  async setRedisJwtToken(userid: number, token: string) {
    await RedisUtil.hset('redisJwtToken', `key${userid}`, token)
  }
  async getRedisJwtToken(userid: number): Promise<string> {
    return await RedisUtil.hget('redisJwtToken', `key${userid}`)
  }
  async deleteRedisJwtToken(userid: number) {
    // 登出和注销帐户等操作，需要删除对应的 token，使先前的 token 失效
    await RedisUtil.hdel('redisJwtToken', `key${userid}`)
  }
  async createJWTToken(userinfo: Userinfo, expiresIn = '1h') {
    // 生成JWT Token
    const token: string = jwt.sign({ data: userinfo }, this.secret, {
      expiresIn,
      header: { alg: 'HS256', typ: 'JWT' }
    })
    return token
  }
  async verifyJWTToken(token: string) {
    // 验证JWT Token
    const decoded = jwt.verify(token, this.secret) as JwtPayload
    return decoded.data
  }
  async checkIfTokenExists(token: string, userid: number) {
    // 检查token是否存在于redis中
    const redisToken = await this.getRedisJwtToken(userid)

    // logger.info(`redisToken===> userid: ${userid} redisToken: ${redisToken} oldtoken: ${token}`)

    if (redisToken === token) {
      return true
    } else {
      return false
    }
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

export default MyJwt.myJwt

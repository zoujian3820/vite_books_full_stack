// import { Json } from 'sequelize/types/utils'
import RedisConfig, { RedisClient } from '@/conf/RedisConfig'
import { getDataType } from './StringUtil'

// 使用 implements 继承接口 interface RedisClient
// 继承接口，必须要实现接口中所有的方法
class RedisUtil implements RedisClient {
  static redisUtil: RedisUtil = new RedisUtil()
  redis!: RedisClient
  constructor() {
    this.init()
  }

  init() {
    this.redis = RedisConfig.redisServerConf()
  }

  async set(key: string, value: string): Promise<any> {
    await this.redis.set(key, value)
  }
  async hset(obj: string, key: string, value: any): Promise<any> {
    await this.redis.hset(obj, key, JSON.stringify(value))
  }
  async hmset(obj: string, ...keyvalues: any[]): Promise<any> {
    await this.redis.hmset(
      obj,
      ...[...keyvalues].map((kOrv) => {
        return getDataType(kOrv) !== 'string' ? JSON.stringify(kOrv) : kOrv
      })
    )
  }

  async get(key: string): Promise<any> {
    return await this.redis.get(key)
  }
  async hget(obj: string, key: string): Promise<any> {
    const value = await this.redis.hget(obj, key)
    return value ? JSON.parse(value) : undefined
  }
  async hgetall(obj: string): Promise<any> {
    const _obj: Record<string, string> = await this.redis.hgetall(obj)
    if (_obj) {
      const rt0bj: Record<string, any> = {}
      Object.getOwnPropertyNames(_obj).forEach((key) => {
        rt0bj[key] = JSON.parse(_obj[key])
      })
      return rt0bj
    } else {
      return undefined
    }
  }
  async hdel(obj: string, ...keys: string[]) {
    await this.redis.hdel(obj, ...keys)
  }
}

export default RedisUtil.redisUtil

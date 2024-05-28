import redis from 'koa-redis'

interface DbConConf {
  host: string
  port: number
}

interface EnvConf {
  dev: DbConConf
  prod: DbConConf
}

export interface RedisClient {
  set(key: string, value: string): any
  get(key: string): any
  hset(obj: string, key: string, value: any): any
  hmset(obj: string, ...keyvalues: any[]): any
  hget(obj: string, key: string): any
  hgetall(obj: string): any
  hdel(obj: string, ...keys: string[]): any
}

class RedsConfig {
  static conf: RedsConfig = new RedsConfig()
  env!: keyof EnvConf
  envConf!: EnvConf

  constructor() {
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConf()
  }
  initConf() {
    this.envConf = {
      dev: {
        host: 'localhost',
        port: 6379
      },
      prod: {
        host: 'localhost',
        port: 6379
		// password: '123456' // 生产redis要设密码，且密码要复杂些，否则会被攻击
      }
    }
  }

  getConf(key: void): DbConConf
  getConf(key: string): string
  getConf(key: any): DbConConf | string | number {
    const dbConf = this.envConf[this.env]
    if (this.isDbConConfKeys(key, dbConf)) {
      return dbConf[key]
    } else {
      return dbConf
    }
  }

  isDbConConfKeys(key: string, dbConf: DbConConf): key is keyof DbConConf {
    return Object.getOwnPropertyNames(dbConf).includes(key)
  }

  redisServerConf() {
    return redis(this.getConf()).client
  }
}

export default RedsConfig.conf

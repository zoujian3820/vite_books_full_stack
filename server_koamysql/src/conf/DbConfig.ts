// 1. 这里定义了一个函数`isString`，它接受一个参数`data`，`data`的类型是`any`，
// 这意味着`data`可以是任何类型。函数的返回类型是`data is string`。
// 2. `data is string` - 这是TypeScript中的类型谓词语法。
// 它表明，如果函数内部的返回值为真，则`data`的类型是`string`。
// 如果返回值为假，则`data`的类型不是`string`。
function isString(data: any): data is string {
  return typeof data === 'string'
}

interface DbConConf {
  host: string
  user: string
  password: string
  port: number
  database: string
}

interface EnvConf {
  dev: DbConConf
  prod: DbConConf
}

class Conf {
  static conf: Conf = new Conf()
  //获取EnvConf所有的key值，成联合类型
  env!: keyof EnvConf
  envConf!: EnvConf
  constructor() {
    this.env = process.env.NODE_ENV?.trim() === 'dev' ? 'dev' : 'prod'
    this.initConf()
  }
  initConf() {
    this.envConf = {
      dev: {
        host: 'localhost',
        user: 'admin',
        password: '1234',
        port: 3306,
        database: 'books'
      },
      prod: {
        host: 'localhost',
        user: 'admin',
        password: '1234',
        port: 3306,
        database: 'books'
      }
    }
  }
  getConf(key: void): DbConConf
  getConf(key: string): string
  getConf(key: any): DbConConf | string | number {
    const dbConf: DbConConf = this.envConf[this.env]
    if (this.isDbConConfKeys(key, dbConf) && key.length > 0) {
      return dbConf[key]
    } else {
      return dbConf
    }
  }
  isDbConConfKeys(key: string, dbConf: DbConConf): key is keyof DbConConf {
    // return key === 'host' || key === 'user' || key === 'password' || key === 'port' || key === 'database'
    return Object.keys(dbConf).includes(key)
  }
}

export default Conf.conf

interface BaseConf {
  baseApi: string
  mockBaseApi: string
}
interface EnvConf {
  development: BaseConf
  production: BaseConf
}
class AllConf {
  env!: keyof EnvConf
  isMock: boolean = false
  baseApi!: string
  mockBaseApi!: string
}
class EnvConfigClass {
  static envConfigClass: EnvConfigClass = new EnvConfigClass()
  readonly curEnv = import.meta.env.MODE === 'development' ? 'development' : 'production'
  envConf!: EnvConf
  allConf!: AllConf
  constructor() {
    this.initEnvConf()
    this.getAllConf()
  }
  initEnvConf() {
    this.envConf = {
      development: {
        baseApi: '/dang',
        mockBaseApi: 'https://www.fastmock.site/mock/a244a48ca0f6b7efaald57b9e57b2c8b/dangdang/'
      },
      production: {
        baseApi: '/dang',
        mockBaseApi: ''
      }
    }
  }
  getAllConf() {
    this.allConf = {
      env: this.curEnv,
      isMock: false,
      ...this.envConf[this.curEnv]
    }
  }
}

export default EnvConfigClass.envConfigClass.allConf

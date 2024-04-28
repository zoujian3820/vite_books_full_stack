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
  readonly curEnv =
    import.meta.env.MODE === 'development' ? 'development' : 'production'
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
        mockBaseApi: 'https://www.fastmock.site/mock/xxx'
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

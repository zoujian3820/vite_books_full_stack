interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock: boolean
}

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
type ReqFn = (
  url: string,
  isMock: boolean,
  data?: any
) => Promise<AxiosResponse<any>>
interface ReqExecute {
  get: ReqFn
  post: ReqFn
  put: ReqFn
  delete: ReqFn
  patch: ReqFn
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
  // AxiosPromise
} from 'axios'

import goodstorageutil from './goodstorageutil'
import { ElMessage } from 'element-plus'
import conf from '@/config'
import router from '@/router'
import { RouteLocationRaw } from 'vue-router'
import { debounce, CommonFunType } from '@/utils'
import UserApi from '@/api/UserApi'
import { Userinfo } from '@/piniastore/userinfo'

const SERVER_ERR = '请求服务器的网址错误或网络连接失败'
const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch']

const routerPush = debounce((args: RouteLocationRaw) => {
  router.push(args)
}, 500)

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExecute
  // 当前是否有 access_token静默续期 请求在进行中
  isFinishing: boolean = false
  // 开始静默续期后，后续加入的请求队列
  requests: CommonFunType[] = []

  constructor() {
    // TS中无参数或少参数，可以接受多参数类型，any返回值 ，可接受任何类型
    this.request = {
      get: (): any => {},
      post: (): any => {},
      delete: (): any => {},
      put: (): any => {},
      patch: (): any => {}
    }
    this.createAxiosInstance()
    this.beforeReqIntercpt()
    this.beforeResponseIntercpt()
    this.reqPrepare()
  }
  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 60000 })
  }
  // 1、请求开始前的请求拦截器
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request) => {
      const headers = request.headers!
      const token = goodstorageutil.get('access_token')
      const userid = goodstorageutil.get('userid')
      if (!headers.Authorization && token && userid) {
        headers.Authorization = `Bearer ${token}`
        headers.Userid = userid
      }
      return request
    })
  }
  // 2、数据响应之前的响应拦截器
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const config = response.config
        const { msg, code } = response.data
        let type = response.data.type
        switch (code) {
          case 200:
            return response.data
          case 400:
          case 403:
            // ElMessage.error(msg)
            return this.handleTokenInvalidAndExpired(config, type, msg)
            return
          case 401:
            if (this.isFinishing) {
              type = 'expired_token'
            }
            // token失效及 access_token过期续期 处理
            return this.handleTokenInvalidAndExpired(config, type, msg)
          case 500:
            ElMessage.error(`发生了错误：${msg}`)
            return
          default:
            ElMessage.error('发生了未知错误')
            return
        }
      },
      (err) => {
        ElMessage.error(SERVER_ERR)
        console.log('response err', err)
      }
    )
  }
  handleTokenInvalidAndExpired(
    config: InternalAxiosRequestConfig,
    type: string,
    msg: string
  ) {
    switch (type) {
      case 'expired_token':
        // 静默登录续期 刷新 access_token
        return this.handleTokenExpired(config)
      case 'invalid_token':
        ElMessage.error(msg)
        // 错误提示后，清除token，并跳转到登录页
        goodstorageutil.remove('access_token')
        routerPush({
          path: '/login',
          query: {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath)
          }
        })
        return
      default:
        ElMessage.error(msg)
        throw new Error(msg)
    }
  }
  handleTokenExpired(config: InternalAxiosRequestConfig) {
    if (!this.isFinishing) {
      const access_token = goodstorageutil.get('access_token')
      const refresh_token = goodstorageutil.get('refresh_token')
      const userid = goodstorageutil.get('userid')
      this.isFinishing = true

      return UserApi.loginRenewal({
        userid,
        access_token,
        refresh_token
      }).then((result: AxiosResponse<Userinfo>) => {
        const { access_token, refresh_token, userid } = result.data || {}
        if (access_token && refresh_token && userid) {
          goodstorageutil.set('access_token', access_token as string)
          goodstorageutil.set('refresh_token', refresh_token as string)
          goodstorageutil.set('userid', userid)
          goodstorageutil.set('userinfo', result.data)
          this.isFinishing = false
          this.requests.forEach((cb) => cb(access_token))
          this.requests = []
          // 刷新token后，重新发送请求
          if (config.headers) {
            config.headers.Authorization = `Bearer ${access_token}`
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
          }
          return this.axiosInstance(config).then((res) => {
            return Promise.resolve(res)
          })
        }
      })
    } else {
      // 统一处理同时请求到 access_token 过期的请求
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        this.requests.push((access_token: string) => {
          config.headers.Authorization = `bearer ${access_token}`
          config.headers['Content-Type'] = 'application/json;charset=UTF-8'
          resolve(this.axiosInstance(config))
        })
      })
    }
  }
  // 3、发送请求给服务器 [发送 post get put delete 或 patch]
  sendRequest(options: AxiosRequestConfig_) {
    // this.axiosInstance({
    //   data: {},
    //   params: {},
    //   url: '',
    //   method: 'post | get'
    // })
    if (conf.env === 'production') {
      this.axiosInstance.defaults.baseURL = conf.baseApi
    } else if (conf.env === 'development') {
      const isMock: boolean = options.isMock || conf.isMock
      this.axiosInstance.defaults.baseURL = isMock ? conf.mockBaseApi : conf.baseApi
    }
    return this.axiosInstance(options)
  }
  // 4、深入灵活应用TS完成请求method类型自动提示
  reqPrepare() {
    return methods.forEach((method) => {
      this.request[method] = (url, isMock, data = {}) => {
        const params = data.params
        delete data.params
        return this.sendRequest({
          method,
          data,
          params,
          isMock,
          url
        })
      }
    })
  }
}

export default AxiosUtil.axiosUtil.request

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
  AxiosResponse
  // AxiosPromise
} from 'axios'

import goodstorageutil from './goodstorageutil'
import { ElMessage } from 'element-plus'
import conf from '@/config'
import router from '@/router'
import { RouteLocationRaw } from 'vue-router'
import { debounce } from '@/utils'
const SERVER_ERR = '请求服务器的网址错误或网络连接失败'
const UNAUTHORIZED_ERR = '这是不合法或过期token'
const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch']

const routerPush = debounce((args: RouteLocationRaw) => {
  router.push(args)
}, 500)

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExecute
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
      const token = goodstorageutil.get('token')
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
        const { msg, code } = response.data
        switch (code) {
          case 200:
            return response.data
          case 400:
          case 403:
            ElMessage.error(msg)
            return
          case 401:
            if (msg === UNAUTHORIZED_ERR) {
              ElMessage.error(msg)
              // 错误提示后，清除token，并跳转到登录页
              goodstorageutil.remove('token')
              routerPush({
                path: '/login',
                query: {
                  redirect: encodeURIComponent(router.currentRoute.value.fullPath)
                }
              })
            } else {
              ElMessage.error(msg)
              throw new Error(msg)
            }
            return
          case 500:
            ElMessage.error(`发生了错误${msg}`)
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

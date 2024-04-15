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

import { ElMessage } from 'element-plus'
import conf from '@/config'
const SERVER_ERR = '请求服务器的网址错误或网络连接失败'
const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch']

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
          case 500:
            return ElMessage.error(`发生了错误${msg}`)
          default:
            return ElMessage.error('发生了未知错误')
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
    //   data: '',
    //   url: '',
    //   method: 'post'
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
      this.request[method] = (url, isMock, data) => {
        return this.sendRequest({
          method,
          data,
          isMock,
          url
        })
      }
    })
  }
}

export default AxiosUtil.axiosUtil.request

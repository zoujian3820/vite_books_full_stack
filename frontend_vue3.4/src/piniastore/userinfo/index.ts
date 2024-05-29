import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import Storage, { OPTION } from '@/utils/goodstorageutil'
import UserApi from '@/api/UserApi'
import { hasProps } from '@/utils'

export default defineStore('userinfoStrore', {
  state: () => {
    return initUserState
  },
  getters: {
    storeLoginUser(state): Userinfo {
      return hasProps(state.userinfo) ? state.userinfo : Storage.get('userinfo')
    },
    storeCaptcha(state): Captcha {
      return state.captcha || {}
    }
  },
  actions: {
    setUserinfo(userinfo: Userinfo) {
      this.userinfo = userinfo
    },
    // 获取所有购物车列表接口
    async login(params: UserLoginPrams) {
      // const loginUser = { username, password } as Userinfo
      const result: AxiosResponse<Userinfo> = await UserApi.login({
        ...params,
        encrypCaptcha: this.captcha.encrypCaptcha,
        captchaId: this.captcha.captchaId
      })

      this.userinfo = result.data

      Storage.set('access_token', result.data.access_token as string)
      Storage.set('refresh_token', result.data.refresh_token as string)
      Storage.set('userid', result.data.userid)
      Storage.set('userinfo', result.data)
    },
    async registeredUsers(params: UserLoginPrams) {
      const result: AxiosResponse<Userinfo> = await UserApi.registeredUsers({
        ...params,
        encrypCaptcha: this.captcha.encrypCaptcha,
        captchaId: this.captcha.captchaId
      })
      this.userinfo = result.data

      Storage.set('access_token', result.data.access_token as string)
      Storage.set('refresh_token', result.data.refresh_token as string)
      Storage.set('userid', result.data.userid)
      Storage.set('userinfo', result.data)
    },
    async getCaptcha() {
      const result: AxiosResponse<{
        data: string
        text: string
        captchaId: string
      }> = await UserApi.getCaptcha()
      // img: string // svg 路径
      // encrypCaptcha: string // 后台加密过的验证码文字
      this.captcha = {
        img: result.data.data,
        encrypCaptcha: result.data.text,
        captchaId: result.data.captchaId
      }
    }
  }
})

export type Userinfo = {
  userid: number
  username: string
  password: string
  address: string
  valid: number
  birth: Date
  access_token?: string
  refresh_token?: string
}

export type UserLoginPrams = {
  username: string
  password: string
  captcha: string
  encrypCaptcha?: string
  captchaId?: string
}

export type Captcha = {
  img: string
  encrypCaptcha: string
  captchaId: string
}

type InitUserState = {
  userinfo: Userinfo
  captcha: Captcha
}

export type UserinfoStore = {
  userinfo: Userinfo
}

const initUserState: InitUserState = {
  userinfo: {} as Userinfo,
  captcha: {
    img: '',
    encrypCaptcha: '',
    captchaId: ''
  }
}
